/**
 *
 * PackageList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Card, Image } from 'semantic-ui-react';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { loadPackageByIdRequest } from '../actions';
import {
  makeSelectError,
  makeSelectRequesting,
  makeSelectPackageResponse,
  makeSelectSuccess,
  makeSelectNewData,
} from '../selectors';

import reducer from '../reducer';
import saga from '../saga';

import PackageView from './createPackageview'

const mapStateToProps = createStructuredSelector({
  isSuccess: makeSelectSuccess(),
  errorResponse: makeSelectError(),
  successResponse: makeSelectPackageResponse(),
  isRequesting: makeSelectRequesting(),
  singlePackage: makeSelectNewData(),
});

const mapDispatchToProps = dispatch => ({
  fetchPackage: id => dispatch(loadPackageByIdRequest(id)),
  // getProductRequest: (page, perPage, query,) =>
  // dispatch(getProductRequest(page, perPage, query)),
});


/* eslint-disable react/prefer-stateless-function */
export class PackageList extends React.Component {
  state = {
    data: {},
    page: 1,
    perPage: 10,
    query: {},
  };
  componentDidMount() {
    let id = this.props.match.params.id ? this.props.match.params.id : null;
    if(id) {
      this.props.fetchPackage(id);
      // this.props.getProductRequest(1, 5, id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.singlePackage != nextProps.singlePackage) {
      this.setState({
        data: nextProps.singlePackage.toJS(),
      });
    }
  }
  render() {
    const { data } = this.state;
    return (
      <div >
        <Helmet>
          <title>PackageList</title>
          <meta name="description" content="Description of PackageList" />
        </Helmet>
        <h1>{data.title}</h1>
        <PackageView
                viewdata={this.state.data}
        />
      </div>
    );
  }
}


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'packageList', reducer });
const withSaga = injectSaga({ key: 'packageList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PackageList);
