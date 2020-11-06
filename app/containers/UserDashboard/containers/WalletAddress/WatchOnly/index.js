import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'semantic-ui-react';

import { clearState, getWatchOnlyAddressRequest, generateWatchOnlyWalletAddress } from './actions';
import { 
   makeSelectGetWatchOnlyAddressRequesting, 
   makeSelectPostWatchOnlyAddressRequesting,
   makeSelectSuccess, 
   makeSelectError, 
   makeSelectGetWatchOnlyAddressResponse,
   makeSelectGenerateWatchOnlyAddressResponse
} from './selectors';
import saga from './sagas'
import reducer from './reducer'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {compose} from "redux";
import AddWallet from './components/AddWallet';

const mapStateToProps = createStructuredSelector({
  errorResponse: makeSelectError(),
  getWatchOnlyAddressRequesting: makeSelectGetWatchOnlyAddressRequesting(),
  postWatchOnlyAddressRequesting: makeSelectPostWatchOnlyAddressRequesting(),
  success: makeSelectSuccess(),
  getWatchOnlyAddressResponse: makeSelectGetWatchOnlyAddressResponse(),
  generateWatchOnlyAddressResponse: makeSelectGenerateWatchOnlyAddressResponse()
});

const mapDispatchToProps = dispatch => ({
  dispatchGetWatchOnlyAddressRequest: payload => dispatch(getWatchOnlyAddressRequest(payload)),
  dispatchGenerateWatchOnlyWalletAddress: payload => dispatch(generateWatchOnlyWalletAddress(payload)),
  clearState: () => dispatch(clearState())
});

class WatchOnlyAddress extends React.Component {
  static propTypes = {

  };
  state = {
    showAddWalletModal: false,
    data: {
    },
    walletAddressesList: [],
    errors: {}
  };

  componentDidMount() {
    this.props.dispatchGetWatchOnlyAddressRequest();
  }
  componentWillUnmount() {
    this.props.clearState();
  }

  showAddWalletModal = () => {
    this.setState({ showAddWalletModal: true, data: {}, errors: {}})
  }

  hideModal = () => {
    this.setState({ showAddWalletModal: false, data: {}, errors: {} })
  }

  handleChange = e => {
    e.persist();
    delete this.state.errors[e.target.name];
    this.setState(state => ({
      data: {
        ...state.data,
        [e.target.name]: e.target.value,
      },
    }));
  }

  handleSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.dispatchGenerateWatchOnlyWalletAddress({ label: data.label })
    }
  };

  validate = () => {
    const { data } = this.state;
    const errors = {};
    if (!data.label) errors.label = "Can't be blank";

    return errors;
  };
 
  render() {
    const { showAddWalletModal, data, errors, walletAddressesList } = this.state;
    const { getWatchOnlyAddressRequesting } = this.props;
   
    return (
      <div className="segment">
       <h1>Watch Only</h1>
       {!!showAddWalletModal && (
          <AddWallet
            hideModal={this.hideModal}
            showModal={showAddWalletModal}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            data={data}
            errors={errors}
          />
        )}
       <Button
          content="New Watch Only Wallet"
          labelPosition='right'
          icon='add circle'
          color="blue"
          onClick={this.showAddWalletModal}
        />
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
