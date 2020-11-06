import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {  } from 'semantic-ui-react';

import { clearState } from './actions';
import { makeSelectRequesting, makeSelectSuccess, makeSelectError, makeSelectResponse } from './selectors';
import saga from './sagas'
import reducer from './reducer'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {compose} from "redux";

const mapStateToProps = createStructuredSelector({
  errorResponse: makeSelectError(),
  requesting: makeSelectRequesting(),
  success: makeSelectSuccess(),
  successResponse: makeSelectResponse()
});

const mapDispatchToProps = dispatch => ({
  // dispatchGetWatchOnlyAddress: payload => dispatch(getWatchOnlyAddress(payload)),
  clearState: () => dispatch(clearState())
});

class WatchOnlyAddress extends React.Component {
  static propTypes = {

  };
  state = {
  
  };
  componentWillUnmount() {
    this.props.clearState();
  }
 
  render() {
    const {  } = this.state;
    const {  } = this.props;
   
    return (
      <div className="segment">
       <h1>Watch Only</h1>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'watchOnlyAddress', reducer });
const withSaga = injectSaga({ key: 'watchOnlyAddress', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WatchOnlyAddress);
