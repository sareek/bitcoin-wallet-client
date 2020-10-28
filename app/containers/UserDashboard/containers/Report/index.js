import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { showDialog } from 'containers/App/actions';
import { makeSelectUserId, makeSelectDialog } from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './sagas';
import { compose } from 'redux';
import Toaster from 'components/Toaster';
import { Link } from 'react-router-dom'
import {
  makeSelectLoading,
  makeSelectReportList,
  makeSelectPublicURL
} from './selectors';
import { Button, Modal, Header } from 'semantic-ui-react';
import { makeSelectLocation } from '../../../App/selectors';

import {
  getReportsListingRequest,
  downloadReportRequest
} from './actions'

const mapStateToProps = createStructuredSelector({
  isRequesting: makeSelectLoading(),
  location: makeSelectLocation(),
  reportsList:makeSelectReportList(),
  publicURL:makeSelectPublicURL()
});

const mapDispatchToProps = dispatch => ({
  showDialog: dialog => dispatch(showDialog(dialog)),
  getReportsListingRequest: () => dispatch(getReportsListingRequest()),
  downloadReportRequest: (key, id) => dispatch(downloadReportRequest(key, id))
});

class Report extends React.Component {
  constructor(props) {
    super(props);
      this.state = { showCopyMsg: false, newreferral: false, allReportsList: '', downloadURL: '', showModal: false };
  }
  componentDidMount() {
    this.props.getReportsListingRequest()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.reportsList != nextProps.reportsList) {
      this.setState({
        allReportsList: nextProps.reportsList && nextProps.reportsList.toJS(),
      });
    }
    if (this.props.publicURL != nextProps.publicURL) {
      this.setState({
        downloadURL: nextProps.publicURL && nextProps.publicURL,
      });
    }
  }
  downloadReport = (filename, productId) => {
    this.props.downloadReportRequest(filename, productId)
  }

  closeModal = () => {
    this.setState({downloadURL: ''})
  }

  render() {
    const {  } = this.props;
    const { allReportsList, downloadURL, showModal } = this.state
    return (
      <div>
        ddddddddddddd
        {downloadURL != '' && 
           <Modal className="multi-fac-modal" open={downloadURL != ''} size="mini" style={{leftMargin :  "20%"}} >
           <Header icon='info circle' content='PDF report' />
           <Modal.Content style={{minHeight :  "80px"}}>
           <span>Click download to get PDF report.</span>
           </Modal.Content>
           <Modal.Actions>
           <a className="ui green button" href={downloadURL} target="_blank">Download</a>
             <Button
               color="red"
               className="button"
               onClick={this.closeModal}
             >
               Cancel
             </Button>
           </Modal.Actions>
         </Modal>
        
        }
        <div className="package_not_found">
          {this.props.location.pathname == '/user/dashboard/reports' &&
            <div className="ui breadcrumb">
              <Link 
                className="section"
                to={{
                  pathname: `/user/dashboard`,
                }}
              >
                Dashoard
              </Link>
              <div className="divider">/</div>
              <div className="active section">Reports</div>
            </div>
          }
          <div className="product-listing">
            <h1 className="main_title">Your Reports</h1>
             <div className="product-grid">
              {allReportsList && allReportsList.dataList && allReportsList.dataList.length > 0 ? (
                allReportsList.dataList.map((item, idx) =>
                    <div key={`paidList${idx}`} className="product-item">
                      <div className="product-wrap">
                          <span className="product-title">Report</span>
                          <br />
                          <br />
                          <ul className="feature-list">
                           <li>
                            <i className="icon-check"/>
                            <span>Report Of: {item && item.product && item.product[0].title}</span> 
                           </li>
                            <li>
                                <i className="icon-check"/>
                              <span>Country: {item && item.product && item.product[0].country} </span>
                            </li>
                            <li>
                                <i className="icon-check"/>
                              <span>Industry: {item && item.product && item.product[0].industry} </span> 
                            </li>
                          </ul>
                          <div className="buttons-wrap">
                        <Link
                            className="ui blue-button button"
                            to={`/user/dashboard/report/detail/${item && item.product_id}`}
                            key={`view__1`}
                          >
                          View Detail
                        </Link>
                          <Button 
                          className="ui button detail-btn"
                              
                              onClick={() => 
                                      this.downloadReport(item && item.report_data && item.report_data.Key, item && item.product_id)}>
                                    Download Report
                          </Button>
                        </div>
                      </div>
                    </div>
                )
              ) : this.props.isRequesting ? (
                <div className="ui segment">
                  <div className="ui active inverted dimmer">
                    <div className="ui small text loader">Loading.....</div>
                  </div>
                  <p></p>
                </div>
              ) : (
                <div className="no-products">
              </div>
              )}
            </div>
          </div>
             </div>   
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'report', reducer });
const withSaga = injectSaga({ key: 'report', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Report);
