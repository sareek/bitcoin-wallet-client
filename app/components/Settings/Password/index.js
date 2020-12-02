import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, Form } from 'semantic-ui-react';
import PasswordInputField from 'components/common/Forms/PasswordInputField';
import PasswordIndicator from 'components/PasswordIndicator';
import { updatePasswordRequest, clearState } from './actions';
import { makeSelectRequesting, makeSelectSuccess, makeSelectError, makeSelectResponse } from './selectors';
import Toaster from "components/Toaster";
import saga from './sagas'
import reducer from './reducer'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {compose} from "redux";

import { toast } from 'react-toastify';

import {  Segment } from 'semantic-ui-react';

const mapStateToProps = createStructuredSelector({
  errorResponse: makeSelectError(),
  requesting: makeSelectRequesting(),
  success: makeSelectSuccess(),
  successResponse: makeSelectResponse()
});

const mapDispatchToProps = dispatch => ({
  updatePasswordRequest: password => dispatch(updatePasswordRequest(password)),
  clearState: () => dispatch(clearState())
});

class Password extends React.Component {
  static propTypes = {
    updatePasswordRequest: PropTypes.func.isRequired,
    clearState: PropTypes.func.isRequired,
    requesting: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired
  };
  state = {
    data: { log_out_all_devices: false },
    errors: {}
  };
  componentWillUnmount() {
    this.props.clearState();
  }
  componentDidUpdate(prevProps) {
    if (this.props.successResponse != prevProps.successResponse) {
      if (this.props.successResponse &&
        this.props.successResponse.toJS() &&
        this.props.successResponse.toJS().status === 200) {
          toast.success(this.props.successResponse.toJS().message ?
                           this.props.successResponse.toJS().message : "Password Changed Successfully");
      }
    }

    if (this.props.errorResponse != prevProps.errorResponse) {
      if (this.props.errorResponse &&
        this.props.errorResponse.toJS() &&
        this.props.errorResponse.toJS().status === 400) {
          toast.error(this.props.errorResponse.toJS().message ?
                           this.props.errorResponse.toJS().message : "Password Change error");
      }
    }
  }
  handleChange = e => {
    e.persist();
    let { errors } = this.state;
    if (!!errors[e.target.name] && !!e.target.value) delete errors[e.target.name];
    this.setState(state => ({
      data: { ...state.data, [e.target.name]: e.target.value },
      errors
    }));
  };
  handleChecked = e => {
    e.persist();
    this.setState(state => ({
      data: {
        ...state.data,
        [e.target.name]: !state.data[e.target.name]
      }
    }));
  };
  validate = () => {
    const { data } = this.state;
    const errors = {};
    if (!data.new_password) errors.new_password = "Please enter a password";
    if (!data.old_password) errors.old_password = "Enter old password";
    if (!data.retyped_password) errors.retyped_password = "Retype new password";
    if (data.new_password !== data.retyped_password) errors.retyped_password = "New password and retyped password must be same.";
    return errors;
  };
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.updatePasswordRequest(this.state.data);
    }
  };
  render() {
    const { data, errors } = this.state;
    const { successResponse, errorResponse, requesting, success } = this.props;
 
    return (
      <Segment>
        <Form className="form" onSubmit={this.handleSubmit}>
          <h2>Change Password</h2>
          <div className="pos-rel field">
            <PasswordInputField password={data.old_password || ''} label="Old Password" placeholder="Old Password"
                                onChange={this.handleChange} error={errors.old_password} name="old_password"
            />
          </div>
          <div className="pos-rel field">
            <PasswordInputField password={data.new_password || ''} placeholder="New Password"
                                onChange={this.handleChange} error={errors.new_password} name="new_password"
            />
          </div>
          {/* <PasswordIndicator password={data.password || ''} /> */}
          <div className="pos-rel field">
            <PasswordInputField password={data.retyped_password || ''} label="Retype Password" placeholder="Retype Password"
                                onChange={this.handleChange} error={errors.retyped_password} name="retyped_password"
            />
          </div>
          {/* <div className="field">
            <label className="custom-control custom-checkbox">
              <input
                className="custom-control-input"
                type="checkbox"
                name="log_out_all_devices"
                onChange={this.handleChecked}
                checked={data.log_out_all_devices}
              />
              <span className="custom-control-indicator" />{' '}
              <span className="custom-control-description">Also Logout from other devices</span>{' '}
            </label>
          </div> */}
          <Button
            style={{borderRadius: "20px"}}
            type="submit"
            className="button"
            loading={requesting}
            disabled={requesting}
            color="orange"
          >
            Save
          </Button>
        </Form>
      </Segment>
    );
  }
}

const withReducer = injectReducer({ key: 'profilePassword', reducer });
const withSaga = injectSaga({ key: 'profilePassword', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Password);
