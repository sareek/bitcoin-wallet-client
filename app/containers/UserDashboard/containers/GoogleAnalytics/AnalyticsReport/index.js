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

import { Grid,Segment } from 'semantic-ui-react'

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

  componentWillUnMount() {
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
       <Grid divided='vertically'>
    <Grid.Row >
      <Grid.Column width={11}>
      
        {message && message}
       <div className="main-heading">
       <p className="title">  <i className="icon bitcoin"></i> Bitcoin <span className="text-muted">BTC</span> </p>
          
       </div>

       <Segment className="main-statistics">
         <div>
           <p className="title">price</p>
           <p className="value">$15,508.64</p>
         </div>
         <div>
           <p className="title">
24 HOUR % CHANGE</p>
           <p className="value text-green" ><i className="icon angle up"></i>3.49%</p>
         </div>
         <div>
           <p className="title">MARKET CAP</p>
           <p className="value">$287.95B</p>
         </div>
         <div>
           <p className="title">VOLUME (24H)</p>
           <p className="value">$39.44B</p>
         </div>
       </Segment>
      </Grid.Column>
      <Grid.Column width={5}>
      <Segment className="announcements">
        <div className="sm-heading"><p className="title"><span><i className="icon bullhorn"></i></span> Announcements </p></div>
      
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
      </Segment>
      </Grid.Column>
    </Grid.Row>

   
  </Grid>
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
