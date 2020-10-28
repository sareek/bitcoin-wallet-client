import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form } from 'semantic-ui-react';
import { showDialog } from '../actions';
import reducer from './reducer';
import saga from './sagas';
import {
  makeSelectSuccess,
  makeSelectResponse,
  makeSelectError,
  makeSelectRequesting,
  makeSelectUserId,
  makeSelectResendEmailRequesting,
} from './selectors';
import { forgotPasswordRequest, resetForgotPassword, resendConfirmationRequest } from './actions';
import InputField from 'components/common/Forms/InputField';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';

const mapStateToProps = createStructuredSelector({
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  isRequesting: makeSelectRequesting(),         
  success: makeSelectSuccess(),
  unverifiedUserId: makeSelectUserId(),
  requestingResendEmail: makeSelectResendEmailRequesting(),
});

const mapDispatchToProps = (dispatch) => ({
  hideDialog: () => dispatch(showDialog()),
  showDialog: (dialog) => dispatch(showDialog(dialog)),
  forgotPassword: (userEmail) => dispatch(forgotPasswordRequest(userEmail)),
  resetForm: () => dispatch(resetForgotPassword()),
  resendConfirmationEmail: (userId) => dispatch(resendConfirmationRequest(userId)),
});

class ForgotPassword extends React.Component { 
  static propTypes = {
    hideDialog: PropTypes.func.isRequired,
    showDialog: PropTypes.func.isRequired,
    forgotPassword: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    unverifiedUserId: PropTypes.string.isRequired,
    resendConfirmationEmail: PropTypes.func.isRequired,
    requestingResendEmail: PropTypes.bool.isRequired,
  };
  state = {
    data: { email: '' },
    errors: {},
  };
  componentWillMount() { 
    this.props.resetForm();
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      data: {
        [e.target.name]: e.target.value,
      },
    });
  };
  validate = data => {
    const errors = {};
    if (!data.email) errors.email = "Can't be blank";
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.forgotPassword(this.state.data);
    }
  };
  resendEmail = () => {
    this.props.resendConfirmationEmail(this.props.unverifiedUserId);
  };
  render() {
    const { errors, data } = this.state;
    const {
      isRequesting, errorResponse, successResponse, unverifiedUserId, requestingResendEmail,
    } = this.props;
    return (
      <Modal
        open onClose={this.props.showForgotPasswordForm} className="mini" closeIcon
      >
        <Modal.Content>
          {errorResponse &&
          <div className="negative message">
            <p>{errorResponse}</p>
            {unverifiedUserId &&
            <Button secondary size="small" onClick={this.resendEmail} disabled={requestingResendEmail} loading={requestingResendEmail}>
              Resend Email
            </Button>}
          </div>}
          {successResponse && <p className="positive message">{successResponse}</p>}
          <h3 className="thin">Reset Your Password</h3>
          <p>
            Don’t worry! Just fill in your email and we’ll send you a password
            reset link.
          </p>
          <Form className="form" onSubmit={this.handleSubmit}>
            <InputField
              type="email" name="email" placeholder="Email" className="form-control"
              value={data.email} onChange={this.handleChange} error={errors.email}
            />
            <div className="field clearfix align-center">
              <div className="inline-block">
                <Button
                  type="submit" className="primary button" loading={isRequesting} disabled={isRequesting}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({key: 'loginForgotPassword', reducer});
const withSaga = injectSaga({key: 'loginForgotPassword', saga});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ForgotPassword);
