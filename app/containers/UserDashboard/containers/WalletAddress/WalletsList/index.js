import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { clearState, getAddressRequest, generateWalletAddress } from './actions';
import {
  makeSelectWalletAddressesResponse,
  makeSelectPostWalletAddressResponse,
  makeSelectError,
  makeSelectGetWalletAddressRequesting,
  makeSelectPostWalletAddressRequesting,
  makeSelectSuccess
} from './selectors';
import saga from './sagas'
import reducer from './reducer'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from "redux";
import { Button } from 'semantic-ui-react';
import WalletListTable from 'components/Table';
import AddWallet from './components/AddWallet';
import { toast } from 'react-toastify';

import { Segment } from 'semantic-ui-react'

const mapStateToProps = createStructuredSelector({
  walletAddressesResponse: makeSelectWalletAddressesResponse(),
  postWalletAddressResponse: makeSelectPostWalletAddressResponse(),
  errorResponse: makeSelectError(),
  getWalletAddressesRequesting: makeSelectGetWalletAddressRequesting(),
  postWalletAddressRequesting:makeSelectPostWalletAddressRequesting(),
  success: makeSelectSuccess()
});

const mapDispatchToProps = dispatch => ({
  dispatchGetAddressRequest: payload => dispatch(getAddressRequest(payload)),
  dispatchGenerateWalletAddress: payload => dispatch(generateWalletAddress(payload)),
  clearState: () => dispatch(clearState()),
});

class WalletsList extends React.Component {
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
    this.props.dispatchGetAddressRequest();
  }
  componentDidUpdate(prevProps) {
    if (this.props.postWalletAddressResponse != prevProps.postWalletAddressResponse) {
      if (this.props.postWalletAddressResponse &&
        this.props.postWalletAddressResponse.toJS() &&
        this.props.postWalletAddressResponse.toJS().status === 200) {
        this.setState({ showAddWalletModal: false }, () => {
          toast.success("Wallet Generated Successfully");
          this.props.dispatchGetAddressRequest();
        })
      }
    }

    if (this.props.walletAddressesResponse != prevProps.walletAddressesResponse) {
      if (this.props.walletAddressesResponse &&
        this.props.walletAddressesResponse.toJS() &&
        this.props.walletAddressesResponse.toJS().status === 200) {
          this.setState({walletAddressesList: this.props.walletAddressesResponse.toJS().data.address_list});
        }
    }
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
      this.props.dispatchGenerateWalletAddress({ label: data.label })
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
    const { getWalletAddressesRequesting } = this.props;

    const headers = [
      {
        key: 1,
        name: 'Wallet Name',
        field: 'label',
      },
      {
        name: 'Balance',
        key: 2,
        format: data => {
          return data
            ? data.balance
            : '---';
        },
      }
    ];

    return (
      <Segment>
        <div className="tbl-heading"><span className="tbl-title"><i className="list ul icon"></i> Wallet Addresses </span> <Button
          content="New Wallet"
          labelPosition='right'
          icon='add circle'
          color="blue"
          onClick={this.showAddWalletModal}
          title="Add new Wallet"
        />
        </div>
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
        <WalletListTable
          headers={headers}
          tableData={walletAddressesList}
          requesting={getWalletAddressesRequesting}
        />
      </Segment>
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
