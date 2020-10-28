import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { showDialog } from 'containers/App/actions';
// import { makeSelectUserId, makeSelectDialog } from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './sagas';
import { compose } from 'redux';
import Toaster from 'components/Toaster';
import noreport from 'assets/images/report.png';
import { Link } from 'react-router-dom'
import './style.scss';
import './assets/mysqpaymentform.css'
import placeholder from './placeholder.png';
import { DOCUMENT_URL_UPDATE, API_BASE  } from '../../../App/constants';
import { Redirect } from 'react-router-dom'
import moment from 'moment';
import check from './assets/check.png';
import cross from './assets/cross.png';

import {
  makeSelectResponse
} from './selectors';

import {
  updateOrderRequest,
  clearCartRequest
} from './actions'


var paymentForm

const mapStateToProps = createStructuredSelector({
  // isRequesting: makeSelectLoading(),
  response:makeSelectResponse()
});

const mapDispatchToProps = dispatch => ({
  showDialog: dialog => dispatch(showDialog(dialog)),
  updateOrderRequest: (payload) => dispatch(updateOrderRequest(payload)),
  clearCartRequest: (payload) => dispatch(clearCartRequest(payload))
});

class Payment extends React.Component {
  constructor(props) {
    super(props);
      this.state = { 
        data: {},
        totalPrice: null,
        redirectToPayment: false
      };
  }

  componentDidMount() {
     if(this.props.location && this.props.location.state != undefined) {
       if(this.props.location.state && this.props.location.state.status == "COMPLETED") {
            window.localStorage.removeItem('cartItem');
       }
       const payload = {
         product_id: this.props.location.state.productId,
         payment_id: this.props.location.state._id,
         order_id: this.props.location.state.OrderId
       }
        this.props.updateOrderRequest(payload)
        this.props.clearCartRequest(payload)
     }
  }

  componentWillReceiveProps(nextProps) {
    
    if (this.props.response != nextProps.response) {
      this.setState({
        response_message: nextProps.response && nextProps.response,
      });
    }
  }

 

  render() {
    const { location } = this.props;
    const { data, totalPrice, redirectToPayment } = this.state
    return (
      <div className="payment-response">
        {location && location.state != undefined ?
        <div className="payment-success">
          <div className="icon">
            <img src={check}/>
          </div>
          <p className="msg green">Payment Successfull !</p>
          <p>Amount Paid: ${location.state.total_money.amount}</p>   
          <p>Payment source: {location.state.source_type}</p>   
          <p>Paid Date: {moment(location.state.updated_at, 'YYYY-MM-DD').format('YYYY-MM-DD') }</p>   
        </div>
         :
          <div>
           <div className="payment-success">
                {/* <p>Payment status: {location.state.status}</p>    */}
                <div className="icon">
                  <img src={cross}/>
                </div>
                <p className="msg red">Payment Failed !!!!!</p>
                
              </div>
          </div>
        }
        </div>
    );
  }
}

const withReducer = injectReducer({ key: 'payment', reducer });
const withSaga = injectSaga({ key: 'payment', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Payment);
