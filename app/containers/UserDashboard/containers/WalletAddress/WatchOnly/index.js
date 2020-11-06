import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, Segment } from 'semantic-ui-react';

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
import WatchOnlyTable from 'components/Table';

import { toast } from 'react-toastify';

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
  
  componentDidUpdate(prevProps) {
    if (this.props.generateWatchOnlyAddressResponse != prevProps.generateWatchOnlyAddressResponse) {
      if (this.props.generateWatchOnlyAddressResponse &&
        this.props.generateWatchOnlyAddressResponse.toJS() &&
        this.props.generateWatchOnlyAddressResponse.toJS().status === 200) {
        this.setState({ showAddWalletModal: false }, () => {
          toast.success("Wallet Generated Successfully");
          this.props.dispatchGetWatchOnlyAddressRequest();
        })
      }
    }

    if (this.props.getWatchOnlyAddressResponse != prevProps.getWatchOnlyAddressResponse) {
      if (this.props.getWatchOnlyAddressResponse &&
        this.props.getWatchOnlyAddressResponse.toJS() &&
        this.props.getWatchOnlyAddressResponse.toJS().status === 200) {
          this.setState({walletAddressesList: this.props.getWatchOnlyAddressResponse.toJS().data.address_list});
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
       <h1>Watch Only</h1>
       <div className="tbl-heading"><span className="tbl-title"><i className="list ul icon"></i> Wallet Addresses </span> <Button
          content="New Watch Only Wallet"
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
          <WatchOnlyTable
          headers={headers}
          tableData={walletAddressesList}
          requesting={getWatchOnlyAddressRequesting}
        />
      </Segment>
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
