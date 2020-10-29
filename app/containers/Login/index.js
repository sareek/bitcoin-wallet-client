import React from 'react';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import Logo from 'assets/images/exchange/Auxledger_Logo_Favicon.png';
import { Button, Image, Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { showDialog } from './actions';
import reducer from './reducer';
// import saga from './sagas';
import {
  makeSelectRequesting,
  makeSelectError,
  makeSelectResponse,
  makeSelectEmail,
  makeSelectSuccess,
  makeSelectCaptchaEnabled,
  makeSelectUserId,
  makeSelectResendEmailRequesting,
  makeSelectDialog,
} from './selectors';
import ForgotPassword from './forgot-password/index';
import { makeSelectUser } from '../App/selectors';
import { validators } from 'utils/validators';
import {
  logoutRequest,
  loginRequest,
  showDialog,
  checkCaptchaRequest,
  loginClearMessages,
  resendConfirmationRequest,
  linkFacebookRequest,
  linkGoogleRequest,
} from './actions';
import { compose } from 'redux';
import getToken from 'utils/getToken';
import jwtDecode from 'jwt-decode';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';
import MultiFactorAuth from '../Login/multi-factor-login';
import { Redirect } from 'react-router-dom';

const mapDispatchToProps = dispatch => ({
  loginRequest: (values, redirect) => dispatch(loginRequest(values, redirect)),
  showDialog: dialog => dispatch(showDialog(dialog)),
  isCaptchaEnabledRequest: () => dispatch(checkCaptchaRequest()),
  clearMessages: () => dispatch(loginClearMessages()),
  redirectToSignup: () => dispatch(push('/signup')),
  resendConfirmationEmail: userId =>
    dispatch(resendConfirmationRequest(userId)),
  linkFacebookRequest: (token, isImp) =>
    dispatch(linkFacebookRequest(token, isImp)),
  linkGoogleRequest: (token, isImp) =>
    dispatch(linkGoogleRequest(token, isImp)),
  logout: () => dispatch(logoutRequest()),
});

const mapStateToProps = createStructuredSelector({
  userResponse: makeSelectUser(),
  requesting: makeSelectRequesting(),
  requestingResendEmail: makeSelectResendEmailRequesting(),
  response: makeSelectResponse(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
  isCaptchaEnabled: makeSelectCaptchaEnabled(),
  unverifiedImpUserId: makeSelectUserId(),
  email: makeSelectEmail(),
  // dialog: makeSelectDialog(),
});

class Login extends React.Component {
  static propTypes = {
    loginRequest: PropTypes.func.isRequired,
    showDialog: PropTypes.func.isRequired,
    isCaptchaEnabledRequest: PropTypes.func.isRequired,
    redirectToSignup: PropTypes.func.isRequired,
    clearMessages: PropTypes.func.isRequired,
    resendConfirmationEmail: PropTypes.func.isRequired,
    unverifiedImpUserId: PropTypes.string.isRequired,
    requestingResendEmail: PropTypes.bool.isRequired,
  };

  state = {
    data: {
      email: this.props.email || '',
    },
    userEmail: '',
    setToken: '',
    reCaptcha: '',
    show_password: false,
    errors: {},
    err: '',
    loadingFb: false,
    show: false,
    loadingGoogle: false,
    redirectToReferer: false,
    showMultifactorForm: false,
  };

  componentDidMount() {
    this.props.isCaptchaEnabledRequest();
  }

  componentWillUnmount() {
    this.props.clearMessages();
  }

  handleChange = e => {
    e.persist();
    delete this.state.errors[e.target.name];
    this.setState(state => ({
      data: {
        ...state.data,
        [e.target.name]: e.target.value,
      },
    }));
  };

  validate = () => {
    const { data, reCaptcha } = this.state;
    const { isCaptchaEnabled } = this.props;
    const errors = {};
    if (!data.email) errors.email = "Can't be blank";
    if (data.email && !validators.emailValidator(data.email)) errors.email = 'Please enter valid email';
    if (!data.password) errors.password = 'password_error';

    // if (isCaptchaEnabled && !reCaptcha)
    //   errors.reCaptcha = 'Please check I am not a Robot checkbox';
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { isCaptchaEnabled, loginRequest } = this.props;
    const { data, reCaptcha } = this.state;
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const { from } = this.props.location.state || { from: false };

      if (isCaptchaEnabled) loginRequest({ ...data, reCaptcha }, from);
      else loginRequest(data, from);
    }
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.error &&
      prevProps.error != this.props.error &&
      this.props.error.length > 0
    ) {
      this.setState(
        {
          err: this.props.error,
        },
        () => {
          localStorage.clear();
        },
      );
    }
    if (
      this.props.userResponse &&
      this.props.userResponse.size > 0 &&
      prevProps.userResponse !== this.props.userResponse
    ) {
      const userInfo = this.props.userResponse.toJS() && 
                              this.props.userResponse.toJS().userInfo &&
                                   this.props.userResponse.toJS().userInfo; 
      const setToken = this.props.userResponse.toJS() && 
                      this.props.userResponse.toJS().token &&
                            this.props.userResponse.toJS().token;                           
      let user_id;
      let userEmail;
      let multi_factor_auth_enable;
      let multi_factor_auth_enable_mobile;
      if(userInfo) {
         user_id = userInfo.user_id;
         userEmail = userInfo.email;
         multi_factor_auth_enable = userInfo.multi_factor_auth_enable;
      }                      

      if (user_id) {
        if (multi_factor_auth_enable || multi_factor_auth_enable_mobile) {
          // this.props.showDialog(<MultiFactorAuth user_id={user_id} />);
          this.setState({ showMultifactorForm: true, user_id: user_id, userEmail, setToken });
        }
      }
    }
  }

  onRecaptchaChange = e => {
    this.setState({
      reCaptcha: e,
    });
  };

  onChange = e => {
    this.setState({
      reCaptcha: e,
    });
  };

  showSignUpForm = () => {
    this.props.showDialog(null);
    this.props.redirectToSignup();
  };

  showForgotPasswordForm = () => {
    this.setState({ show: !this.state.show });
  };

  resendEmail = () => {
    this.props.resendConfirmationEmail(this.props.unverifiedImpUserId);
  };

  showMultifactorDialog = () => {
    this.setState({ showMultifactorForm: !this.state.showMultifactorForm });
  };

  render() {
    const {
      data,
      errors,
      err,
      reCaptcha,
      showMultifactorForm,
      user_id,
      userEmail,
      setToken
    } = this.state;
    const {
      response,
      requesting,
      unverifiedImpUserId,
      requestingResendEmail,
      userResponse,
    } = this.props;
    let userResp = userResponse ? userResponse.toJS() : {};
    let url = '';
    if (userResp && Object.keys(userResp).length > 1) {
      url =
        userResp.role === 'customer'
          ? '/user/dashboard' :
        '/admin/dashboard';
    }
    const token = getToken();
   if(token){
        try {
              const decoded = jwtDecode(token);
              if (
                typeof decoded === 'object' &&
                decoded.hasOwnProperty('user_id') 
              ) {
                const { role } = decoded;
                if(role === 'customer')  return <Redirect to="/user/dashboard" />;
              }
            } catch(error) {
                  throw(error);
            }
          }

    return (
      <div className="login__wrap">
        <div className="login__box">
          <div className="login__logo">
            <Image
              // spaced="bottom"
              size="small"
              src={Logo}
              alt="XAL"
              centered
            />
          </div>
          {this.state.show && (
            <ForgotPassword
              showForgotPasswordForm={this.showForgotPasswordForm}
            />
          )}
          {err && err.length > 0 && (
            <Message negative icon>
              <Icon name="warning circle" />
              <Message.Content>
                <Message.Header>Error !</Message.Header>
                <p>{err}</p>
              </Message.Content>
            </Message>
          )}

          {response && <div className="positive message">{response}</div>}
          <h3>
            {userResp && typeof userResp === 'object' && Object.keys(userResp).length > 1
              ? 'Already Logged in'
              : 'Login'}
          </h3>
          {userResp && typeof userResp === 'object' && !('_id' in userResp) && (
            <LoginForm
              data={data}
              errors={errors}
              requesting={requesting}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              onRecaptchaChange={this.onRecaptchaChange}
              showForgotPasswordForm={this.showForgotPasswordForm}
            />
          )}
          {userResp && Object.keys(userResp).length > 1 && userResp._id && (
            <div className="login__info">
              <p>
                You are already logged in. Go to{' '}
                <Link className="alt-link" to={url}>
                  Dashboard
                </Link>
                .
              </p>
              <p>OR</p>
              <p>
                <span className="alt-link" onClick={this.props.logout}>
                  Logout
                </span>{' '}
                and sign in using different account.
              </p>
            </div>
          )}
          {showMultifactorForm && (
            <MultiFactorAuth
              user_id={user_id}
              userEmail={userEmail}
              token={setToken}
              showMultifactorDialog={this.showMultifactorDialog}
            />
          )}
        </div>
      </div>
    );
  }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
// const withSaga = injectSaga({key: 'login', saga});

export default compose(
  withConnect,
  // withSaga,
  withReducer,
)(Login);
