import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Link } from 'react-router-dom';

import { prefixes } from '../App/constants';
import UserRegistrationForm from './components/UserRegistrationForm';
import {
  signupRequest,
  clearState,
  linkFacebookRequest,
  linkGoogleRequest,
  verifyReferCodeRequest,
  verifyReferCodeReq,
} from './actions';
import { showDialog } from '../App/actions';
import {
  makeSelectError,
  makeSelectRequesting,
  makeSelectResponse,
  makeSelectSMSRequesting,
  makeSelectSmsSent,
  makeSelectMobileNumberValidated,
  makeSelectSuccess,
  makeSelectVerificationData,
  makeSelectVerify,
} from './selectors';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import ReferErrorPage from 'components/common/ReferErrorPage';

const mapDispatchToProps = dispatch => ({
  signupRequest: data => dispatch(signupRequest(data)),
  clearState: () => dispatch(clearState()),
  linkFacebookRequest: (token, isImp) =>
    dispatch(linkFacebookRequest(token, isImp)),
  linkGoogleRequest: (token, isImp) =>
    dispatch(linkGoogleRequest(token, isImp)),
  addMobileRequest: mobileInfo => dispatch(addMobileRequest(mobileInfo)),
  confirmMobileRequest: code => dispatch(confirmMobileRequest(code)),
  showDialog: dialog => dispatch(showDialog(dialog)),
  verifyReferCode: refer_code => dispatch(verifyReferCodeRequest(refer_code)),
  verifyReq: refer => dispatch(verifyReferCodeReq(refer)),
});

const mapStateToProps = createStructuredSelector({
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  isRequesting: makeSelectRequesting(),
  is_sms_Requesting: makeSelectSMSRequesting(),
  success: makeSelectSuccess(),
  sms_sent: makeSelectSmsSent(),
  mobile_number_validated: makeSelectMobileNumberValidated(),
  verify_data: makeSelectVerificationData(),
  verify: makeSelectVerify(),
});
let referCode = '';

class SignupForm extends React.Component {
  static propTypes = {
    signupRequest: PropTypes.func.isRequired,
    clearState: PropTypes.func.isRequired,
    isRequesting: PropTypes.bool.isRequired,
    addMobileRequest: PropTypes.func,
    confirmMobileRequest: PropTypes.func,
    showDialog: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    referCode = '';

    this.state = {
      data: {
        email_offer_subscription: false,
        agree_terms_condition: false,
      },
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.match.params.referCode) {
      referCode = this.props.match.params.referCode;
      this.setState(
        {
          data: {
            ...this.state.data,
            refer_code: referCode,
          },
        },
        () => {
          this.props.verifyReferCode(this.state.data.refer_code);
        },
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.verify_data != prevProps.verify_data) {
      this.setState({
        verify_data: this.props.verify_data.toJS(),
      });
    }
    if (this.props.verify != prevProps.verify) {
      this.setState({
        verify: this.props.verify.toJS(),
      });
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  handleChange = e => {
    e.persist();
    this.setState(state => ({
      data: { ...state.data, [e.target.name]: e.target.value },
    }));
  };
  handleBlur = e => {
    e.persist();
    this.props.verifyReq(e.target.value);
  };
  handleCheckbox = e => {
    e.persist();
    this.setState(state => ({
      data: {
        ...state.data,
        [e.target.name]: e.target.checked,
      },
    }));
  };
  onRecaptchaChange = e => {
    this.setState(state => ({
      data: { ...state.data, reCaptcha: e },
    }));
  };

  handleSemanticChange = (e, { name, value }) => {
    this.setState(state => ({
      data: { ...state.data, [name]: value },
    }));
  };

  validate = () => {
    const { data } = this.state;
    const errors = {};
    if (!data.username) errors.username = "Can't be blank";
    if (data.username && data.username.length > 26)
      errors.username = "Can't be more than 26 characters";
    if (data.username && !/^[a-zA-Z]+$/.test(data.username))
      errors.username = 'Can only contain letters';
    if (!data.email) errors.email = "Can't be blank";
    if (!data.password) errors.password = 'password_error';
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.props.signupRequest(this.state.data);
    }
  };

  render() {
    const { data, errors } = this.state;
    const { errorResponse, isRequesting } = this.props;
    return this.state.verify_data && this.state.verify_data.message ? (
      <ReferErrorPage message={this.state.verify_data.message} />
    ) : (
      <div className="signup__wrap">
        {errorResponse && <p className="negative message">{errorResponse}</p>}
        <UserRegistrationForm
          handleSubmit={this.handleSubmit}
          handleSemanticChange={this.handleSemanticChange}
          handleChange={this.handleChange}
          data={data}
          errors={errors}
          handleCheckbox={this.handleCheckbox}
          onRecaptchaChange={this.onRecaptchaChange}
          isRequesting={isRequesting}
          prefixes={prefixes}
          referCode={referCode}
          handleBlur={this.handleBlur}
        />
     
      </div>
    );
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'register', reducer });
const withSaga = injectSaga({ key: 'register', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignupForm);
