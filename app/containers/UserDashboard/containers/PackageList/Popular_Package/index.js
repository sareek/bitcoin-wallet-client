/**
 *
 * PopularPackage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Button,
  Card,
  Image,
  Icon,
  CardContent,
  Segment,
  Placeholder,
  Grid,
} from 'semantic-ui-react';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  loadAllPopularPackageRequest,
  postCartRequest,
  loadAllCartPackageRequest,
  removeCartRequest,
} from './actions';
import { Link } from 'react-router-dom';
import { DOCUMENT_URL_UPDATE } from 'containers/App/constants';
// import SubscribedPackage from './Cart/SubscribedPackage';
// import TopNavigation from '../../components/TopNavigation';

import {
  makeSelectSuccess,
  makeSelectSuccessResponse,
  makeSelectError,
  makeSelectRequesting,
  makeSelectCartPackage,
  makeSelectPopularPackage,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import loksewa from 'assets/images/loksewa.jpg';
/* eslint-disable react/prefer-stateless-function */
export class PopularPackage extends React.Component {
  state = {
    data: [],
    page: 1,
    perPage: 10,
    query: {},
    cart: [],
    package_title: [],
    cartPackages: [],
  };
  componentWillMount() {}

  componentDidMount() {
    this.props.fetchPackage();
    this.props.fetchCartPackage();
  }
  componentWillReceiveProps(nextProps) {
    // if (this.props.url != nextProps.url) {
    //   this.props.fetchPackage();
    //   this.props.fetchCartPackage();
    // }
    if (this.props.packageList != nextProps.packageList) {
      this.setState({
        data: nextProps.packageList.toJS(),
      });
    }
    if (nextProps.successResponse != this.props.successResponse) {
      this.props.fetchCartPackage();
    }
    if (nextProps.cart_packages != this.props.cart_packages) {
      this.setState(
        {
          cartPackages:
            nextProps.cart_packages &&
            nextProps.cart_packages.toJS().dataList &&
            nextProps.cart_packages.toJS().dataList[0]
              ? nextProps.cart_packages.toJS().dataList[0].packages
              : [],
        },
        () => {
          this.props.handleCartSize(this.state.cartPackages.length);
        },
      );
    }
  }

  handleRemoveCart = (e, id) => {
    e.preventDefault();
    let cart = {
      packages: id,
    };
    this.props.removeCart(cart);
  };

  handleAddCart = (e, id) => {
    e.preventDefault();
    let cart = {
      packages: id,
    };
    this.props.postCart(cart);
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        {/* <SubscribedPackage /> */}
        <h1 className="main_title">Top Free Packages</h1>
        <div className="package__grid">
          {data &&
          data.freePopularPackages &&
          data.freePopularPackages.length > 0 ? (
            data.freePopularPackages.map((packageData, idx) => (
              <div key={`freeList${idx}`} className="package__column">
                <div className="img__wrap">
                  <figure>
                    <img
                      className="img-fluid"
                      src={`${DOCUMENT_URL_UPDATE}${
                        packageData.image_name.document_name
                      }`}
                      alt="a"
                    />
                    <span>free</span>
                  </figure>
                  <div className="pkg__wrapper">
                    <h1>{packageData.title}</h1>
                    <ul>
                      {packageData &&
                        packageData.included_features &&
                        packageData.included_features.map((feature, idx) => (
                          <li key={`feature${idx}`}>
                            <i className="icon-check" />
                            {feature.feature}
                          </li>
                        ))}
                    </ul>
                    {packageData && (
                      <Link
                        to={{
                          pathname: `/user/dashboard/exam-display/${
                            packageData._id
                          }`,
                          state: { title: packageData.title },
                        }}
                      >
                        <button>start exam</button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : this.props.isRequesting ? (
            <Grid columns={3} stackable>
              <Grid.Column>
                <Segment raised>
                  <Placeholder>
                    <Placeholder.Header image>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line length="medium" />
                      <Placeholder.Line length="short" />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </Segment>
              </Grid.Column>
            </Grid>
          ) : (
            <Card>
              <CardContent>Packages Not Found</CardContent>
            </Card>
          )}
        </div>
        <h1 className="main_title">Top Paid Packages</h1>
        <div className="package__grid">
          {data && data.paidPackages && data.paidPackages.length > 0 ? (
            data.paidPackages.map((packageData, idx) => (
              <div key={`paidList${idx}`} className="package__column">
                <div className="img__wrap">
                  <figure>
                    <img
                      className="img-fluid"
                      src={`${DOCUMENT_URL_UPDATE}${
                        packageData.image_name.document_name
                      }`}
                      alt="a"
                    />
                    <span>NRp.{packageData.price}</span>
                    <div className="hover__cart">
                      {/* <button>
                        <i className="icon-shopping-cart" />
                        <p>add to cart</p>
                      </button> */}
                      {this.state.cartPackages.includes(packageData._id) ? (
                        <button
                          onClick={e =>
                            this.handleRemoveCart(e, packageData._id)
                          }
                        >
                          <i className="icon-shopping-cart" />
                          Remove From Cart
                        </button>
                      ) : (
                        <button
                          onClick={e => this.handleAddCart(e, packageData._id)}
                        >
                          <i className="icon-shopping-cart" />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </figure>

                  <div className="pkg__wrapper">
                    <h1>{packageData.title}</h1>
                    <ul>
                      {packageData &&
                        packageData.included_features &&
                        packageData.included_features.map((feature, idx) => (
                          <li key={`feature${idx}`}>
                            <i className="icon-check" />
                            {feature.feature}
                          </li>
                        ))}
                    </ul>
                    {packageData.trial_period_applicable && (
                      <Link
                        to={{
                          pathname: `/user/dashboard/trial/exam-display/${
                            packageData._id
                          }`,
                          state: { title: `Trial ${packageData.title}` },
                        }}
                      >
                        <button>Start Trial</button>
                      </Link>
                    )}
                    {/* {packageData && (
                      <Link
                        to={{
                          pathname: `/user/dashboard/exam-display/${
                            packageData._id
                          }`,
                          state: { title: packageData.title },
                        }}
                      >
                        <button>start exam</button>
                      </Link>
                    )} */}
                  </div>
                </div>
              </div>
            ))
          ) : this.props.isRequesting ? (
            <Grid columns={3} stackable>
              <Grid.Column>
                <Segment raised>
                  <Placeholder>
                    <Placeholder.Header image>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line length="medium" />
                      <Placeholder.Line length="short" />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </Segment>
              </Grid.Column>
            </Grid>
          ) : (
            <Card>
              <CardContent>Packages Not Found</CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  packageList: makeSelectPopularPackage(),
  isSuccess: makeSelectSuccess(),
  errorResponse: makeSelectError(),
  successResponse: makeSelectSuccessResponse(),
  isRequesting: makeSelectRequesting(),
  cart_packages: makeSelectCartPackage(),
});

const mapDispatchToProps = dispatch => ({
  fetchPackage: () => dispatch(loadAllPopularPackageRequest()),
  postCart: cart => dispatch(postCartRequest(cart)),
  removeCart: cart => dispatch(removeCartRequest(cart)),
  fetchCartPackage: () => dispatch(loadAllCartPackageRequest()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'popularPackageList', reducer });
const withSaga = injectSaga({ key: 'popularPackageList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PopularPackage);
