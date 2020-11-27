import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { clearState,
         getAddressRequest, 
         generateWalletAddress,
         deleteWalletAddress 
} from './actions';
import {
  makeSelectWalletAddressesResponse,
  makeSelectPostWalletAddressResponse,
  makeSelectError,
  makeSelectGetWalletAddressRequesting,
  makeSelectPostWalletAddressRequesting,
  makeSelectSuccess,
  makeSelectDeleteWalletAddressResponse,
  makeSelectDeleteWalletAddressRequesting,
  makeSelectDeleteWalletAddressError
} from './selectors';
import saga from './sagas'
import reducer from './reducer'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from "redux";
import WalletListTable from 'components/Table';
import AddWallet from '../components/AddWallet';
import DeleteWallet from '../components/DeleteWallet';
import { toast } from 'react-toastify';

import { text_truncate } from "utils/helperFunctions";

import { Segment, Popup, Grid, Button } from 'semantic-ui-react'

const mapStateToProps = createStructuredSelector({
  walletAddressesResponse: makeSelectWalletAddressesResponse(),
  postWalletAddressResponse: makeSelectPostWalletAddressResponse(),
  errorResponse: makeSelectError(),
  getWalletAddressesRequesting: makeSelectGetWalletAddressRequesting(),
  postWalletAddressRequesting: makeSelectPostWalletAddressRequesting(),

  deleteWalletAddressResponse: makeSelectDeleteWalletAddressResponse(),
  deleteWalletAddressRequesting: makeSelectDeleteWalletAddressRequesting(),
  deleteWalletAddressError: makeSelectDeleteWalletAddressError(),

  success: makeSelectSuccess()
});

const mapDispatchToProps = dispatch => ({
  dispatchGetAddressRequest: payload => dispatch(getAddressRequest(payload)),
  dispatchGenerateWalletAddress: payload => dispatch(generateWalletAddress(payload)),
  dispatchDeleteWalletAddress: payload => dispatch(deleteWalletAddress(payload)),
  clearState: () => dispatch(clearState()),
});

class WalletsList extends React.Component {
  static propTypes = {

  };
  state = {
    showAddWalletModal: false,
    showDeleteModal: false,
    deleteData: {},
    data: {
    },
    walletAddressesList: [],
    errors: {},
    copiedBit: false,
    copiedAddress: ''
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

    if (this.props.deleteWalletAddressResponse != prevProps.deleteWalletAddressResponse) {
      if (this.props.deleteWalletAddressResponse &&
        this.props.deleteWalletAddressResponse.toJS() &&
        this.props.deleteWalletAddressResponse.toJS().status === 200) {
          toast.success("Wallet Deleted Successfully");
          this.props.dispatchGetAddressRequest();
          this.setState({showDeleteModal: false});
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

  copyToClipBoard = (address) => {
    var dummyElement = document.createElement('input'),
      copyText = address;
    document.body.appendChild(dummyElement);
    dummyElement.value = copyText;
    dummyElement.select();
    document.execCommand('copy');
    document.body.removeChild(dummyElement);
    this.setState({copiedBit: true, copiedAddress: address});
    setTimeout(() => {
      this.setState({copiedBit: false, copiedAddress: ''});
    }, 1000);
  };

  handleWalletDeleteModal = (data) => {
    this.setState({showDeleteModal: true, deleteData: data})
  } 

  hideDeleteModal = () => {
    this.setState({showDeleteModal: false})
  }

  handleDeleteSubmit = () => {
    const { deleteData } = this.state;
    // console.log(deleteData)
    // this.props.dispatchDeleteWalletAddress(id)
  }
 
  render() {
    const { 
         showAddWalletModal, 
         showDeleteModal, 
         data, 
         errors, 
         walletAddressesList, 
         copiedBit, 
         copiedAddress 
    } = this.state;
    const { 
       getWalletAddressesRequesting, 
       postWalletAddressRequesting,
       deleteWalletAddressRequesting 
    } = this.props;

    const headers = [
      {
        key: 1,
        name: 'Wallet Label',
        field: 'label',
      },
      {
        name: 'Address',
        key: 2,
        format: data => {
          return (
            <>
             <Grid columns='equal'>
              <Grid.Column width={14}>
                <Popup
                    trigger={  
                    <div className="wallet-address-table">
                      {data
                        ? text_truncate(data.address ?  data.address : "---", 33) 
                        : '---'}
                      </div>}
                    content={data.address}
                    basic
                  /> 
              </Grid.Column>
              <Grid.Column width={2}>
              <Popup
                content={copiedBit ? 'copied' : 'copy'}
                on='click'
                open={copiedAddress === data.address}
                trigger={<button
                  type="button"
                  name="copyToken"
                  value="copy"
                  className="copyToken ui right icon button"
                  onClick={() => this.copyToClipBoard(data.address)}
                >
                  <i className="copy icon"></i>
                </button>}
              />
              </Grid.Column>
            </Grid>
          </>
        )
        },
      },
      {
        name: 'Balance',
        key: 3,
        format: data => {
          return data
            ? data.balance
            : '---';
        },
      },
      {
        key: 5,
        name: 'Action',
        format: (data) => (
          <div className="action" key={JSON.stringify(data)}>
            {actions && actions.map((action) => action.format(data))}
          </div>
        ),
      }
    ];

    const  actions = [
      {
        key: 1,
        action_title: 'remove_product',
        format: (data) => (
          <Button
            size="tiny"
            color="red"
            onClick={() => this.handleWalletDeleteModal(data)}
            title="Delete Wallet"
            key={data.address_index}
          >
            Delete
          </Button>
        ),
      },
    ];

    return (
      <Segment>
        <div className="tbl-heading"><span className="tbl-title"><i className="list ul icon"></i> Wallet Addresses </span> <Button
          content="New Wallet"
          labelPosition='right'
          icon='add circle'
          color="orange"
          onClick={this.showAddWalletModal}
          title="Add new Wallet"
        />
        </div>
        {!!showAddWalletModal && (
          <AddWallet
            title="Add New Bitcoin Address"
            isRequesting={postWalletAddressRequesting}
            hideModal={this.hideModal}
            showModal={showAddWalletModal}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            data={data}
            errors={errors}
          />
        )}
          {!!showDeleteModal && (
          <DeleteWallet
            title="Delete Address"
            isRequesting={deleteWalletAddressRequesting}
            hideModal={this.hideDeleteModal}
            showModal={showDeleteModal}
            handleSubmit={this.handleDeleteSubmit}
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
