import React from 'react';
import PropTypes from 'prop-types';
import {createStructuredSelector} from 'reselect';
import { connect } from 'react-redux';
import { basicInfoClearState } from './actions';
import { makeSelectResponse, makeSelectError, makeSelectRequesting, makeSelectSuccess } from './selectors';
import { makeSelectUser } from 'containers/App/selectors';
import saga from './sagas'
import reducer from './reducer'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {compose} from "redux";

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  requesting: makeSelectRequesting(),
  success: makeSelectSuccess()
});

const mapDispatchToProps = dispatch => ({
  // dispatchGetAddressRequest: payload => dispatch(getAddressRequest(payload)),
  clearState: () => dispatch(basicInfoClearState()),
});

class WalletsList extends React.Component {
  static propTypes = {
 
  };
  state = {
  
  };
  componentDidMount() {
  
  }
  componentDidUpdate(prevProps) {
   
  }
  componentWillUnmount() {
    this.props.clearState();
  }

  render() {
    const {  } = this.state;
    const {  } = this.props;
 
    return (
      <div className="segment">
        <h2>Wallets List</h2>
     
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'walletsList', reducer });
const withSaga = injectSaga({ key: 'walletsList', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WalletsList);
