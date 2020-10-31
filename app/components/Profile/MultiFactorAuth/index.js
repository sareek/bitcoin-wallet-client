import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Form, Button, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import getUserObject from "utils/getUserInfo";
import FormField from 'components/common/Forms/FormField';
import saga from './sagas'
import reducer from './reducer'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {compose} from "redux";

import InputField from 'components/common/Forms/InputField';
import getToken from 'utils/getToken';
import jwtDecode from 'jwt-decode';
import QRCode from 'qrcode.react';


import {
  makeSelectEnable2FAResponse,
  makeSelectMultiFactorAuth,
  makeSelectSuccessResponse,
  makeSelectErrorResponse,
  makeSelectRequesting,
  makeSelectRecoveryCodes,
  makeSelectMessage,
  makeSelectRecoveryCodeGeneratedOn,
  makeSelectUser,
  makeSelectBasicInfoRequesting
} from './selectors';
import {
  getMultiFactorAuthRequest,
  enable2faAuthRequest,
  verifyMultiFactorAuthRequest,
  disableMultiFactorAuthRequest,
  getRecoveryCodesRequest,
  generateRecoveryCodeRequest,
  sendMultiFactorRecoveryCodesEmailRequest,
  loadBasicInfoRequest
} from './actions';
import Toaster from 'components/Toaster';
import { toast } from 'react-toastify';

const mapDispatchToProps = (dispatch) => ({
  getMultiFactorAuthRequest: () => dispatch(getMultiFactorAuthRequest()),
  enable2faAuthRequest: (payload) => dispatch(enable2faAuthRequest(payload)),
  getRecoveryCodesRequest: () => dispatch(getRecoveryCodesRequest()),
  generateRecoveryCodeRequest: (userId) => dispatch(generateRecoveryCodeRequest(userId)),
  sendMultiFactorRecoveryCodesEmailRequest: (userId) => dispatch(sendMultiFactorRecoveryCodesEmailRequest(userId)),
  verifyMultiFactorAuthRequest: (token) => dispatch(verifyMultiFactorAuthRequest(token)),
  disableMultiFactorAuthRequest: (payload) => dispatch(disableMultiFactorAuthRequest(payload)),
  loadBasicInfoRequest: (userEmail) => dispatch(loadBasicInfoRequest(userEmail))
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  confirmUpdateMultiFactorAuth: makeSelectMultiFactorAuth(),
  enable2FAResponse: makeSelectEnable2FAResponse(),
  successResponse: makeSelectSuccessResponse(),
  errorResponse: makeSelectErrorResponse(),
  isRequesting: makeSelectRequesting(),
  basicInfoRequesting: makeSelectBasicInfoRequesting(),
  recoveryCodes: makeSelectRecoveryCodes(),
  message: makeSelectMessage(),
  recovery_code_generated_on: makeSelectRecoveryCodeGeneratedOn()
});

class MultiFactorAuth extends React.Component {
  static propTypes = {
    getMultiFactorAuthRequest: PropTypes.func.isRequired,
    enable2faAuthRequest: PropTypes.func.isRequired,
    verifyMultiFactorAuthRequest: PropTypes.func.isRequired,
    disableMultiFactorAuthRequest: PropTypes.func.isRequired,
    generateRecoveryCodeRequest: PropTypes.func.isRequired
  };
  state = {
    data: {
      totp_token: '',
    },
    multiFactorAuth: this.props.user && this.props.user.get('multi_factor_auth_enable'),
    showMultiFactorAuthDisable: false,
    errors: {},
    recoveryCodes: [],
    message: {},
    user: {},
    userEmail: ''
  };


  componentDidMount() {
    const userObj = getUserObject();
    if(userObj._id) {
      this.props.getRecoveryCodesRequest();
    }
    const token = getToken();
    if(token){
         try {
               const decoded = jwtDecode(token);
               if (
                 typeof decoded === 'object' &&
                 decoded.hasOwnProperty('user_id') 
               ) {
                 const { email } = decoded;
                 this.setState({userEmail: email ? email : ''}, () => {
                   this.props.loadBasicInfoRequest(this.state.userEmail);
                 })
               }
             } catch(error) {
                   throw(error);
             }
           }
  }

  componentDidUpdate(prevProps) {
    if (this.props.errorResponse && prevProps.errorResponse !== this.props.errorResponse) {
      toast.error(this.props.errorResponse ? this.props.errorResponse : 'error')
    }
    if (
      this.props.user && this.props.user && this.props.user.get('multi_factor_auth_enable') !==
      prevProps.user.get('multi_factor_auth_enable')
    ) {
      this.setState({
        multiFactorAuth: this.props.user.get('multi_factor_auth_enable'),
        showMultiFactorAuthDisable: false
      });
    }
    if (prevProps.user !== this.props.user) {
      const user = prevProps.user.toJS();
      this.setState({
        user,
        multiFactorAuth: this.props.user && this.props.user.get('multi_factor_auth_enable'),
      });
    }
  }

  handleCheckBox = () => {
    this.setState(
      {
        multiFactorAuth: !this.state.multiFactorAuth,
      },
      function () {
        if (this.state.multiFactorAuth) {
          const { userEmail } = this.state;
          this.props.enable2faAuthRequest({email: userEmail, reenable: false});
          // this.props.getMultiFactorAuthRequest();
        }
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { data, userEmail } = this.state;
    const secret = this.props.confirmUpdateMultiFactorAuth.get('secret');
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.verifyMultiFactorAuthRequest(
      { data, userEmail, secret }
      );
      this.setState({
        isLoading: true,
        data: {
          totp_token: '',
          userEmail: userEmail
        },
        errors: {}
      });
    }
  };

  validate = () => {
    const errors = {};
    const { data } = this.state;
    if (!data.totp_token) errors.totp_token = "Can't be blank";
    return errors;
  };

  handleChange = e => {
    let errors  = this.state.errors;
    if (!!errors[e.target.name] && !!e.target.value) delete errors[e.target.name];
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors
    });
  };

  changeMultiFactorAuthStatus = () => {
    this.setState({
      showMultiFactorAuthDisable: !this.state.showMultiFactorAuthDisable,
    });
  };

  disableMultiFactorAuthRequest = () => {
    // const userId = this.props.user.get('_id');
    const { userEmail, data: { totp_token } } = this.state;
    this.props.disableMultiFactorAuthRequest({ userEmail, totp_token });
  };

  generateRecoveryCodeRequest = () => {
    this.props.generateRecoveryCodeRequest(this.props.user.get('_id'));
  };

  sendMultiFactorRecoveryCodesEmailRequest = () => {
    this.props.sendMultiFactorRecoveryCodesEmailRequest(this.props.user.get('_id'));
  };

  render() {
    const { multiFactorAuth, showMultiFactorAuthDisable, data, errors } = this.state;
    const { successResponse, errorResponse, isRequesting, basicInfoRequesting, recoveryCodes, user } = this.props;
    let message;
    if (successResponse && typeof successResponse === 'string') {
      message = <Toaster message={successResponse} timeout={1000} success />;
    }
    if (errorResponse && typeof errorResponse === 'string') {
      message = <Toaster message={errorResponse} timeout={1000} error />;
    }
    return (
      <div>
        <div className="section">
          {/* {message && message} */}
          {basicInfoRequesting ? (
            <div className="loader_wallet"></div>
          ): (
            <div className="segment">
            <br />
            {this.props.user && this.props.user.get('multi_factor_auth_enable') &&
            <div>
              {!showMultiFactorAuthDisable &&
              <div>
                <div className="field mg-btm-sm">
                  <label className="custom-control custom-checkbox">
                    <input
                      name="multiFactorAuth"
                      className="custom-control-input"
                      type="checkbox"
                      checked={
                        this.props.user && this.props.user.get('multi_factor_auth_enable') || false
                      }
                      disabled
                    />
                    <span className="custom-control-indicator" />{' '}
                    <span className="custom-control-description">Two Factor Auth Enabled</span>{' '}
                  </label>
                </div>
                <br />
                <Button negative onClick={this.changeMultiFactorAuthStatus}>
                  Disable Two Factor Auth
                </Button>
              </div>}
              {showMultiFactorAuthDisable &&
              <div>
                <div className="form__elements">
                <p>Do you want to disable two factor auth?</p>
                  <InputField
                    className="totp__input"
                    type="text"
                    name="totp_token"
                    placeholder="Token..."
                    value={data.totp_token || ''}
                    onChange={this.handleChange}
                    error={errors.totp_token}
                  />
                <br />
                <Button
                  className="button positive"
                  onClick={this.disableMultiFactorAuthRequest}
                  loading={isRequesting}
                  disabled={isRequesting}
                >
                  Yes, Disable
                </Button>
                <Button
                  className="button basic"
                  onClick={this.changeMultiFactorAuthStatus}
                >
                  Cancel
                </Button>
                </div>
              </div>}
            </div>}
            {this.props.user && !this.props.user.get('multi_factor_auth_enable') &&
            <div className="field">
              <Checkbox
                label="Enable Two Factor Auth"
                name="multiFactorAuth"
                onClick={this.handleCheckBox}
                checked={multiFactorAuth}
                toggle
              />
              {multiFactorAuth &&
              <div className="mg-top-sm">
                <div className="message info">
                  Scan the following QR code with any authenticator App.<br/><br/>
                  <a className="mg-right-sm" target="_blank" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2">
                    <img src='' />
                  </a>
                  <a target="_blank" href="https://itunes.apple.com/us/app/google-authenticator/id388497605">
                    <img src='' />
                  </a>
                </div>
                {this.props.enable2FAResponse &&
                <QRCode value={this.props.enable2FAResponse} />
                }
                <div>
                  <Form onSubmit={this.handleSubmit}>
                    <FormField
                      type="text" name="totp_token" value={data.totp_token} onChange={this.handleChange}
                      placeholder="Enter the token from authenticator app" error={errors.totp_token && errors.totp_token}
                    />
                    <Button
                      primary
                      type="submit"
                      loading={isRequesting}
                      disabled={isRequesting}
                    >Verify</Button>
                  </Form>
                </div>
              </div>}
            </div>}
          </div>
          )}
       
        </div>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'addMultiFactorAuth', reducer });
const withSaga = injectSaga({ key: 'addMultiFactorAuth', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MultiFactorAuth);
