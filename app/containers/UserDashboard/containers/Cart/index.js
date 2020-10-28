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
import PayWithCard from  './PayWithCard'
import emptyCart from 'assets/images/empty_cart.png';

import {
  makeSelectCartProducts,
  makeSelectResponse,
  makeSelectpaymentSuccessData,
  makeSelectError,
  makeSelectLoading          
} from './selectors';
// import { makeSelectLocation } from '../../../App/selectors';

import {
  getProductsInCartRequest,
  removeCartRequest,
  placeOrderRequest,
  payThroughCardRequest
} from './actions'

var paymentForm

const mapStateToProps = createStructuredSelector({
  // isRequesting: makeSelectLoading(),
  cartProducts:makeSelectCartProducts(),
  response:makeSelectResponse(),
  paymentSuccessData:makeSelectpaymentSuccessData(),
  payError:makeSelectError(),
  loading:makeSelectLoading()
});

const mapDispatchToProps = dispatch => ({
  showDialog: dialog => dispatch(showDialog(dialog)),
  getProductsInCartRequest: () => dispatch(getProductsInCartRequest()),
  removeCartRequest: (id) => dispatch(removeCartRequest(id)),
  placeOrderRequest: (ids) => dispatch(placeOrderRequest(ids)),
  payThroughCardRequest: (data) => dispatch(payThroughCardRequest(data))
});

class Cart extends React.Component {
  constructor(props) {
    super(props);
      this.state = { 
        data: {},
        totalPrice: null,
        arrayPIds: [],
        redirectToPayment: false,
        showModal: false,
        paymentSuccessPage: false,
        error_message: '',
        isRequesting: false
      };
  }


  componentDidMount() {
    this.props.getProductsInCartRequest()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.cartProducts != nextProps.cartProducts) {
      var tot = 0
      var arrayProductId = new Array();
      nextProps.cartProducts && nextProps.cartProducts.toJS().dataList.map((item, index) => {
         tot = tot + item.product.price,
         arrayProductId.push(item.product._id)
        })
      this.setState({
        data: nextProps.cartProducts && nextProps.cartProducts.toJS(),
        totalPrice: tot,
        arrayPIds: arrayProductId
      },
       () => {
           window.localStorage.setItem('cartItem', nextProps.cartProducts && nextProps.cartProducts.toJS() && nextProps.cartProducts.toJS().dataList.length);
           this.props.handleCartSize(nextProps.cartProducts && nextProps.cartProducts.toJS() && nextProps.cartProducts.toJS().dataList.length)
       }
       );
    }
    if (this.props.response != nextProps.response) {
      this.setState({
        response_message: nextProps.response && nextProps.response,
      });
    }
    if (this.props.payError != nextProps.payError) {
      this.setState({
        error_message: nextProps.payError && nextProps.payError,
      });
    }
    if (this.props.loading != nextProps.loading) {
      this.setState({
        isRequesting: nextProps.loading && nextProps.loading,
      });
    }
    if (this.props.paymentSuccessData != nextProps.paymentSuccessData) {
      this.setState({
        payment_data: nextProps.paymentSuccessData && nextProps.paymentSuccessData,
      }, ()=> {
        if(this.state.payment_data && this.state.payment_data.status == "COMPLETED") {
            this.setState({paymentSuccessPage: true})
        }
      });
    }
  }

  removeCart = (id) => {
    this.props.removeCartRequest(id)
  }
  placeOrder = (ids) => {
    this.setState({redirectToPayment: true, showModal: true})
    this.props.placeOrderRequest(ids)
  }

  onGetCardNonce = (event) => {
    // Don't submit the form until SqPaymentForm returns with a nonce
    event.preventDefault();
    // Request a nonce from the SqPaymentForm object
    paymentForm.requestCardNonce();
  }

  cartSection = () => {
    this.setState({redirectToPayment: false})
  }
 
  closeModal = () => {
      this.setState({ showModal: false })
    }  

    payFromCardRequest = (nonce) => {
      // this.setState({showModal: false})
      this.props.payThroughCardRequest(nonce)
    }  

  render() {
    const {  } = this.props;
    const { data, totalPrice, redirectToPayment, arrayPIds, showModal, payment_data, paymentSuccessPage, error_message, isRequesting } = this.state

    return (
      <div className="cart-grid">
        {paymentSuccessPage && 
           <Redirect 
              to={
                {pathname: `/user/dashboard/payment-info`,
                 state: payment_data
            }} />
        }
        {error_message == "Payment Failure" &&
          <Redirect 
          to={
            {pathname: `/user/dashboard/payment-info`,
             state: payment_data
        }} />
        }
        {redirectToPayment && 
          <PayWithCard isRequesting={isRequesting} payFromCardRequest={this.payFromCardRequest} closeModal={this.closeModal} showModal={showModal} cartSection={this.cartSection} totalPrice = {totalPrice} />
        }
     {data && data.dataList && data.dataList.length > 0 &&     
      <div className="p-4 white-bg">
      <div className="ui top attached header cart-heading">
            <span> My Cart Items: ({data && data.dataList && data.dataList.length }) </span>
            <span className="right">Total: ${totalPrice}</span>
          </div>

          <div className="ui  divided items">
            {data && data.dataList && data.dataList.map((item, index) => {
              return (
                <div className="item" key={index}>
                  <div className="image">
                  <img src={`${DOCUMENT_URL_UPDATE}${item && 
                                    item.product.image_name && 
                                        item.product.image_name.document_name}`} 
                                            alt="product image here" />
                  </div>
                  <div className="content">
                    <p className="header">{item.product.title}</p>
                    <div className="meta">
                    <span className="price">${item.product.price}</span>
                    </div>
                    <div className="description">
                      <p> Profile Name :{item.product.profile_name} </p>
                      <p>{item.product.description}</p> 
                    </div>
                    <button onClick={() => this.removeCart(item._id) } className="ui basic labeled icon button delete-button">
                      <i className="trash alternate icon"></i>
                        Remove from Cart
                    </button>
                  </div>
                </div>
            )
          })}
       </div>
      </div>
     }
     {data && data.dataList && data.dataList.length > 0 &&     
        <div className="order-detail">
          <div className="ui card">
            <div className="content grey-bg">
              <div className="header">Price Details</div>
            </div>
            <div className="content">

              <div className="pricing-grid">
                {/* <span className="">Product 1</span> */}
                {/* <span className="right"> ${totalPrice}</span> */}
              </div>
              
              <div className="pricing-grid total">
                <span className="">Order Total</span>
                <span className="right"> ${totalPrice}</span>
              </div>

            </div>

            <div className="extra content">
              <button 
                onClick={
                          () => this.placeOrder(arrayPIds)} 
                className="ui green labeled icon  button order-btn">
                    <i className="cart arrow down icon"></i>
                     Place Order
              </button>
            </div>
          </div>
        </div>
     }
          {data && data.dataList && data.dataList.length < 1 &&
                           <div className="no-products">
                           <img src={emptyCart}/>
                         </div>
          }     
</div>
        

    );
  }
}

const withReducer = injectReducer({ key: 'cartProduct', reducer });
const withSaga = injectSaga({ key: 'cartProduct', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Cart);
