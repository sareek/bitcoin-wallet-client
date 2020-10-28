/**
 *
 * CartDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Toaster from 'components/Toaster';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Button,
  Card,
  Image,
  Icon,
  Grid,
  List,
  Segment,
  Checkbox,
  Header,
} from 'semantic-ui-react';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  loadCartDetailRequest,
  cartCheckoutRequest,
  removeCartRequest,
  loadCartInfoRequest,
  verifyKhaltiPaymentRequest,
  clearMessage,
} from './actions';
import { push } from 'react-router-redux';
import { DOCUMENT_URL_UPDATE } from 'containers/App/constants';

import {
  makeSelectSuccess,
  makeSelectXResponse,
  makeSelectPackageResponse,
  makeSelectError,
  makeSelectRequesting,
  makeSelectCart,
  makeSelectCartInfo,
  makeSelectKhaltiResponse,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import Khalti from './Khalti/KhaltiPayment';

/* eslint-disable react/prefer-stateless-function */
export class MyCart extends React.Component {
  state = {
    show: false,
    cartDetail: [],
    payment_method: '',
  };

  componentDidMount() {
    this.props.fetchCart();
    this.props.fetchCartInfo();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.cart != this.props.cart) {
      this.setState(
        {
          cartDetail: nextProps.cart.toJS().dataList,
        },
        () => {
          let totalPrice = 0;
          let cartPackages = [];
          this.state.cartDetail.map(cart => {
            cartPackages.push(cart._id);
            totalPrice += cart.price;
          });
          this.setState({ totalPrice });
          this.setState({ cartPackages });
        },
      );
    }
    if (nextProps.cartInfo != this.props.cartInfo) {
      this.setState(
        {
          cartInfo: nextProps.cartInfo && nextProps.cartInfo.toJS().dataList[0],
        },
        () => {
          this.props.handleCartSize(
            this.state.cartInfo &&
              this.state.cartInfo.packages &&
              this.state.cartInfo.packages.length,
          );
        },
      );
    }
    if (nextProps.successResponse != this.props.successResponse) {
      this.props.fetchCart();
      this.props.fetchCartInfo();
    }
    if (nextProps.khaltiSuccessRes != this.props.khaltiSuccessRes) {
      let data = {
        packages: this.state.cartPackages,
      };
      this.props.checkoutRequest(data);
    }
  }
  componentWillUnmount() {
    this.props.clearMessage();
  }
  handleCheckout = e => {
    e.preventDefault();
    if (this.state.payment_method && this.state.payment_method == 'khalti') {
      if (this.state.cartInfo.packages.length > 0)
        this.setState({ show: true });
      else {
        alert('There is no Any Packages in Your Cart');
      }
    } else {
      this.setState({ show: false });
    }
  };
  handleClose = () => {
    this.setState({ show: false, payment_method: '' });
  };
  handleVerify = async data => {
    this.handleClose();
    let product = {
      khalti_token: data.token,
      amount: data.amount,
    };
    await this.props.verifyPayment(product);
  };
  handleRemove = async (e, id) => {
    e.preventDefault();
    let cart = {
      packages: id,
    };
    await this.props.removeFromCart(cart);
  };

  handlePaymentMethod = (e, data) => {
    e.preventDefault();
    this.setState({ payment_method: data });
  };
  render() {
    const { cartDetail, cartInfo } = this.state;
    const { successResponse, errorResponse, khaltiSuccessRes } = this.props;
    let message;
    if (khaltiSuccessRes) {
      message = <Toaster message={khaltiSuccessRes} timeout={5000} success />;
    }
    if (errorResponse) {
      message = <Toaster message={errorResponse} timeout={5000} error />;
    }
    return (
      <div className="my_cart">
        {message && message}
        <h1 className="main_title">My Cart</h1>
        {cartDetail && cartDetail.length > 0 ? (
          <Grid>
            <Grid.Column mobile={16} tablet={16} computer={10}>
              <List relaxed>
                {cartDetail &&
                  cartDetail.map((pack, idx) => (
                    <List.Item key={`pac${idx}`}>
                      <Image
                        size="medium"
                        alt={pack.title}
                        src={`${DOCUMENT_URL_UPDATE}${
                          pack.image_name ? pack.image_name.document_name : ''
                        }`}
                      />
                      <List.Content>
                        <List.Header>{pack.title}</List.Header>
                        <List.Description>
                          <p>{pack.description}</p>
                          <span onClick={e => this.handleRemove(e, pack._id)}>
                            <Icon name="trash" /> remove from cart
                          </span>
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  ))}
              </List>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={6}>
              <Segment>
                <div className="order_summary">
                  <h1>ORDER SUMMARY</h1>
                  <div className="order_row">
                    <strong>
                      Price({cartDetail && cartDetail.length} items):
                    </strong>
                    <span>Rs.{this.state.totalPrice}</span>
                  </div>
                  <div className="order_row">
                    <strong>SUB TOTAL:</strong>
                    <span>Rs.{this.state.totalPrice}</span>
                  </div>
                  <div className="checkout">
                    <h1>Payment Method</h1>
                    <div>
                      <Image
                        className={
                          this.state.payment_method === 'khalti'
                            ? 'img-holder-payment active'
                            : 'img-holder-payment'
                        }
                        // style={logoStyle}
                        onClick={e => this.handlePaymentMethod(e, 'khalti')}
                        src="https://upload.wikimedia.org/wikipedia/en/archive/f/fd/20181106110247%21Khalti_Digital_Wallet_Logo.png"
                      />
                    </div>
                    {this.state.show && (
                      <Khalti
                        productIdentity={cartInfo && cartInfo._id}
                        productName="Medicrony Packages"
                        amount={this.state.totalPrice * 100}
                        productUrl="http://localhost:3000/user/dashboard/package"
                        handleClose={this.handleClose}
                        handleVerify={data => this.handleVerify(data)}
                      />
                    )}
                  </div>

                  <Button
                    onClick={e => this.handleCheckout(e)}
                    disabled={!this.state.payment_method}
                  >
                    PROCEED TO CHECKOUT
                  </Button>
                </div>
              </Segment>
            </Grid.Column>
          </Grid>
        ) : (
          <Segment>There is no Packages in Your Cart</Segment>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isSuccess: makeSelectSuccess(),
  errorResponse: makeSelectError(),
  successResponse: makeSelectPackageResponse(),
  isRequesting: makeSelectRequesting(),
  cart: makeSelectCart(),
  cartInfo: makeSelectCartInfo(),
  khaltiSuccessRes: makeSelectKhaltiResponse(),
});

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(loadCartDetailRequest()),
  checkoutRequest: packages => dispatch(cartCheckoutRequest(packages)),
  removeFromCart: cart => dispatch(removeCartRequest(cart)),
  fetchCartInfo: () => dispatch(loadCartInfoRequest()),
  verifyPayment: data => dispatch(verifyKhaltiPaymentRequest(data)),
  clearMessage: () => dispatch(clearMessage()),
  redirect: url => dispatch(push(url)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'cartList', reducer });
const withSaga = injectSaga({ key: 'cartList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MyCart);
