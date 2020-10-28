import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Toaster from 'components/Toaster';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import saga from './sagas';
import reducer from './reducer';

import {
  loadAnalyticsInfoRequest,
  updateAnalyticsInfoRequest,
  clearMessage,
} from './actions';

import {
  makeSelectRequesting,
  makeSelectResponse,
  makeSelectError,
  makeSelectSuccess,
  makeSelectData,
} from './selector';

import GoogleAnalyticsForm from './GoogleAnalyticsForm';

const mapStateToProps = createStructuredSelector({
  success: makeSelectSuccess(),
  requesting: makeSelectRequesting(),
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  data: makeSelectData(),
});

const mapDispatchToProps = dispatch => ({
  updateAnalyticsInfoRequest: data =>
    dispatch(updateAnalyticsInfoRequest(data)),
  loadAnalyticsInfo: () => dispatch(loadAnalyticsInfoRequest()),
  clearMessage: () => dispatch(clearMessage()),
});

class GoogleAnalyticsInfo extends React.Component {
  state = {
    data: {},
    errors: {},
  };

  componentWillUnmount() {
    this.props.clearMessage();
  }

  componentDidMount() {
    this.props.loadAnalyticsInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState(state => ({
        data: this.props.data.toJS(),
      }));
    }
  }

  handleChange = event => {
    const { errors } = this.state;
    if (!!errors[event.target.name] && !!event.target.value) {
      delete errors[event.target.name];
    }
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const { data } = this.state;
      this.props.updateAnalyticsInfoRequest(data);
    }
  };

  validate = () => {
    const { data } = this.state;
    const errors = {};
    if (!data.view_id) errors.view_id = "View ID can't be blank";
    if (!data.private_key) errors.private_key = "Private Key can't be blank";
    if (!data.client_email) errors.client_email = "Client Email can't be blank";
    return errors;
  };

  render() {
    const { data, errors } = this.state;
    const { successResponse, errorResponse, requesting } = this.props;
    let message = null;
    if (successResponse) {
      message = <Toaster message={successResponse} timeout={5000} success />;
    }
    if (errorResponse) {
      message = <Toaster message={errorResponse} timeout={5000} error />;
    }
    return (
      <div>
        {message && message}

        <h1>Google Analytics</h1>

        <GoogleAnalyticsForm
          errors={errors}
          data={data}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          isRequesting={requesting}
        />
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'googleAnalytics', reducer });
const withSaga = injectSaga({ key: 'googleAnalytics', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GoogleAnalyticsInfo);
