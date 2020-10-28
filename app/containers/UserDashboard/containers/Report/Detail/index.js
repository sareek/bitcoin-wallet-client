import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {  } from 'semantic-ui-react';
import { clearMessage } from './actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './sagas';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'

import {
  makeSelectError,
  makeSelectResponse,
  makeSelectGraphData,
  makeSelectLoading
} from './selectors';

import {
  getGraphDataRequest,
  downloadReportRequest
} from './actions'

const mapStateToProps = createStructuredSelector({
  successResponse: makeSelectResponse(),
  isRequesting: makeSelectLoading(),
  errorResponse: makeSelectError(),
  graphData:makeSelectGraphData()
});

const mapDispatchToProps = dispatch => ({
  clearMessage: () => dispatch(clearMessage()),
  getGraphDataRequest: (id) => dispatch(getGraphDataRequest(id)),
  downloadReportRequest: (id) => dispatch(downloadReportRequest(id))
});

class NewReferral extends React.Component {
  state = {
    complianceTotal: 0,
    pciTotal: 0,
    data: {},
    errors: {},
    close: true,
    graphData: []
  };

  componentDidMount() {

  }
  componentDidUpdate() {

  }


  componentWillUnmount() {
    this.props.clearMessage();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.graphData != this.props.graphData) {
      this.setState({
        graphData: nextProps.graphData ? nextProps.graphData : '',
      }, () => {
         !this.props.isRequesting && this.updateChart(this.state.graphData);
         var a = 0
         var b = 0
         var pciA = 0
         var pciB = 0
         nextProps.graphData && nextProps.graphData.dataList && nextProps.graphData.dataList.map((item) => {
         a = a + item.compliance
         b = b + item.total
         if(item.tag_name == 'PCI') {
           pciA = pciA + item.compliance
           pciB = pciB + item.total
         }
     })
         const total_compliance = ((a*100) / b)
         const pci_compliance = ((pciA*100) / pciB)
         
          if(b != 0){
            this.setState({complianceTotal: b}, ()=> {!this.props.isRequesting && this.updateChart2(total_compliance);})
            
          }
          if(pciB != 0) {
            this.setState({pciTotal: pciB}, ()=> { !this.props.isRequesting && this.updateChart3(pci_compliance);})
          }
      });
    }
    
  }

  render() {
    const { data, errors, graphData, pciTotal, complianceTotal } = this.state;
    const { isRequesting, errorResponse, successResponse } = this.props;
    return (
      <div>
        {!isRequesting ? 
        <div className="graphs">
          <div className="clearfix">
            <div className="bar-graph mb-5 mr-3" >
              <p className="chart-title">Number of NIST and PCI Controls Assessed</p>
              <div style={{width: '100%'}} id="chart">Bar Graph</div>
            </div>
          </div>
           {pciTotal != 0 &&
           <div className="clearfix">
            <div className="gauge-chart mb-5 mt-5">
              <p className="chart-title">PCI Score</p>
              <div style={{width: '100%'}} id="chart3">No PCI score available</div>
            </div>
          </div>
           }
           {complianceTotal &&
          <div className="clearfix">
            <div className="gauge-chart mb-5 mt-5">
              <p className="chart-title">Privacy and Cyber Security Score</p>
              <div style={{width: '100%'}} id="chart2">Gauge Graph</div>
            </div>
          </div>
            }
        </div>
           
        :
        <div className="product-grid">
          <div className="ui segment">
          <div className="ui active inverted dimmer">
            <div className="ui small text loader">Loading.....</div>
          </div>
          <p></p>
        </div>
        </div>
        }
      </div>
    );
  }
}



const withReducer = injectReducer({ key: 'reportDetail', reducer });
const withSaga = injectSaga({ key: 'reportDetail', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewReferral);



