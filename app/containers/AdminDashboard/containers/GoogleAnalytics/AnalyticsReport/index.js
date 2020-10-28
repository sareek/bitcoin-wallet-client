import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Toaster from 'components/Toaster';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import saga from '../sagas';
import reducer from '../reducer';

import { loadAnalyticsReportRequest, clearMessage } from '../actions';

import {
  makeSelectRequesting,
  makeSelectResponse,
  makeSelectError,
  makeSelectSuccess,
  makeSelectReportData,
} from '../selector';

import PieChartData from './PieChartData';
import LineChartData from './LineChartData';
import CountData from './CountData';

const mapStateToProps = createStructuredSelector({
  success: makeSelectSuccess(),
  requesting: makeSelectRequesting(),
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  reportData: makeSelectReportData(),
});

const mapDispatchToProps = dispatch => ({
  loadAnalyticsReport: () => dispatch(loadAnalyticsReportRequest()),
  clearMessage: () => dispatch(clearMessage()),
});

class GoogleAnalyticsReport extends React.Component {
  state = {
    data: {},
  };

  componentWillMount() {
    this.props.clearMessage();
  }

  componentDidMount() {
    this.props.loadAnalyticsReport();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reportData !== this.props.reportData) {
      this.setState(state => ({
        data: this.props.reportData.toJS(),
      }));
    }
  }

  render() {
    const { data } = this.state;
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
        <h1>Dashboard--</h1>
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
)(GoogleAnalyticsReport);
