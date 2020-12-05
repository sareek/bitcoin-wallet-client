import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { showDialog } from 'containers/App/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './sagas';
import { compose } from 'redux';
import {
  makeSelectLoading,
  makeSelectGetWalletAddresses,
  makeSelectCurrentBalance,
  makeSelectGetWalletInfo,
  makeSelectError,
  makeSelectGetWalletAddressesRequesting,
  makeSelectSendWalletAddressesRequesting,
  makeSelectSendWalletAddressesResponse,
  makeSelectSendWalletAddressesError,
  makeSelectGetTransactionInfoRequesting,
  makeSelectGetTransactionInfoResponse,
  makeSelectGetTransactionInfoError
} from './selectors';
import { Button, Grid, Segment, Popup, Label, Divider } from 'semantic-ui-react';
import { text_truncate } from "utils/helperFunctions";
import ReceiveCryptoForm from './components/ReceiveCryptoForm';
import SendCryptoForm from './components/SendCryptoForm';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import TransactionsTable from 'components/Table';
import moment from 'moment';

import {
  getNewAddressRequest,
  getBalanceRequest,
  getWalletInfoRequest,
  sendWalletAddressRequest,
  getTransactionInfoRequest
} from './actions'

const mapStateToProps = createStructuredSelector({
  walletAddresses: makeSelectGetWalletAddresses(),
  currentBalance: makeSelectCurrentBalance(),
  walletInfo: makeSelectGetWalletInfo(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  getWalletAddressesRequesting: makeSelectGetWalletAddressesRequesting(),
  sendWalletAddressesRequesting: makeSelectSendWalletAddressesRequesting(),
  sendWalletAddressesResponse: makeSelectSendWalletAddressesResponse(),
  sendWalletAddressesError: makeSelectSendWalletAddressesError(),
  getTransactionInfoRequesting: makeSelectGetTransactionInfoRequesting(),
  getTransactionInfoResponse: makeSelectGetTransactionInfoResponse(),
  getTransactionInfoError: makeSelectGetTransactionInfoError() 
});

const mapDispatchToProps = dispatch => ({
  showDialog: dialog => dispatch(showDialog(dialog)),
  dispatchSendWalletAddressRequest: (data) => dispatch(sendWalletAddressRequest(data)),
  dispatchGetTransactionInfoRequest: (data) => dispatch(getTransactionInfoRequest(data)),
  dispatchGetNewAddressRequest: () => dispatch(getNewAddressRequest()),
  dispatchGetWalletInfoRequest: () => dispatch(getWalletInfoRequest()),
  dispatchGetBalanceRequest: (walletInfo) => dispatch(getBalanceRequest(walletInfo))
});

class Wallet extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        data: {},
        errors: {},
        transactionsList: [],
        showReceiveModal: false,
        showSendModal: false,
        walletAddresses: [],
        currentBalance: {},
        walletInfo: {},
        copiedBit: false,
        copiedAddress: ''
       };
  }
  componentDidMount() {
    this.props.dispatchGetWalletInfoRequest();
    this.props.dispatchGetTransactionInfoRequest();
  }

  componentDidUpdate(prevProps) {
    if(this.props.error === "Unauthorized user / session expired") {
      localStorage.removeItem("token");
      return <Redirect to={'/'} />;
   }
    if (this.props.walletAddresses != prevProps.walletAddresses) {
      const addresses = this.props.walletAddresses && 
                            this.props.walletAddresses.toJS() &&
                                this.props.walletAddresses.toJS().address_list;

       const walletOptions = addresses && addresses.length > 0 && addresses.map((item) => {
          return {
            key: item.address,
            text:item.label,
            value: item.address
          }
        })
      this.setState({
        walletAddresses: walletOptions,
      });
    }   

    if (this.props.currentBalance != prevProps.currentBalance) {
      this.setState({
        currentBalance: this.props.currentBalance && this.props.currentBalance.toJS(),
      });
    } 
    
    if (this.props.walletInfo != prevProps.walletInfo) {
      this.setState({
        walletInfo: this.props.walletInfo && this.props.walletInfo.toJS(),
      }, () => {
        // if(this.state.walletInfo && this.state.walletInfo.btc_address && this.state.walletInfo.btc_address !== 'NA') this.props.dispatchGetBalanceRequest(this.state.walletInfo);
      });
    }  

    if (this.props.sendWalletAddressesResponse != prevProps.sendWalletAddressesResponse) {
      if (this.props.sendWalletAddressesResponse &&
        this.props.sendWalletAddressesResponse.toJS() &&
        this.props.sendWalletAddressesResponse.toJS().status === 200) {
          toast.success(this.props.sendWalletAddressesResponse.toJS().message ?
          this.props.sendWalletAddressesResponse.toJS().message : "Sent Successfuly" );
          this.setState({showSendModal: false});
        }
    }

    if (this.props.sendWalletAddressesError != prevProps.sendWalletAddressesError) {
      if (this.props.sendWalletAddressesError &&
        this.props.sendWalletAddressesError.toJS() &&
        this.props.sendWalletAddressesError.toJS().status === 400) {
            toast.error(this.props.sendWalletAddressesError.toJS().message ? 
                           this.props.sendWalletAddressesError.toJS().message : "Error while sending");
          this.setState({showSendModal: false});
        }
    }
    if (this.props.getTransactionInfoResponse != prevProps.getTransactionInfoResponse) {
      if (this.props.getTransactionInfoResponse &&
        this.props.getTransactionInfoResponse.toJS() &&
        this.props.getTransactionInfoResponse.toJS().status === 200) {
          this.setState({transactionsList: this.props.getTransactionInfoResponse.toJS().data.transaction_data});
        }
    }

    if (this.props.getTransactionInfoError != prevProps.getTransactionInfoError) {
      if (this.props.getTransactionInfoError &&
        this.props.getTransactionInfoError.toJS() &&
        this.props.getTransactionInfoError.toJS().status === 400) {
            toast.error(this.props.getTransactionInfoError.toJS().message ? 
                           this.props.getTransactionInfoError.toJS().message : "Error while getting trasaction info");
          this.setState({showSendModal: false});
        }
    }
  }

  showReceiveModal = () => {
    this.props.dispatchGetNewAddressRequest();
    this.setState({showReceiveModal: true, data: {}});
  }

  hideModal = () => {
    this.setState({showReceiveModal: false, data: {}})
    this.props.dispatchGetWalletInfoRequest();
  }

  showSendModal = () => {
    this.props.dispatchGetNewAddressRequest();
    this.setState({showSendModal: true, data: {}});
  }

  hideSendModal = () => {
    this.setState({showSendModal: false, data: {}});
  }

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

  handleDropDown = (e, se) => {
    let { errors } = this.state;
    if (!!errors[se.name] && !!se.value) delete errors[se.name];
    this.setState({
      data: {
        ...this.state.data,
        [se.name]: se.value
      }
    })
  }

  handleChange = e => {
    const { walletInfo } = this.state;
    let { errors } = this.state;
    if (!!errors[e.target.name] && !!e.target.value) delete errors[e.target.name];
    const btcPresent = walletInfo && walletInfo.btc_price ? walletInfo.btc_price : 'N/A';

    e.persist();
    if(e.target.name === "usd_amount") {
      this.setState(state => ({
        data: {
          ...state.data,
          [e.target.name]: e.target.value,
          btc_amount: btcPresent !== 'N/A' ? (e.target.value / btcPresent).toFixed(6) : 'N/A'
        }
      }));
    } else if(e.target.name === "btc_amount") {
      this.setState(state => ({
        data: {
          ...state.data,
          [e.target.name]: e.target.value,
          usd_amount:  btcPresent !== 'N/A' ? (e.target.value * btcPresent) : 'N/A'
        }
      }));
    } else {
      this.setState(state => ({
        data: {
          ...state.data,
          [e.target.name]: e.target.value,
        }
      }));
    }
  };

  submitSendAddress = () => {
    const { data } = this.state;
    const errors = this.validateForm();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.dispatchSendWalletAddressRequest(data);
    }
  }

  validateForm = () => {
    const { data } = this.state;
    const errors = {};
    if (!data.btc_amount) errors.btc_amount = "Please enter a btc value";
    if (!data.from_address) errors.from_address = "Please enter a btc value";
    if (!data.to_address) errors.to_address = "Please enter a btc value";
    return errors;
  };

  render() {
   const { 
       showReceiveModal, 
       showSendModal, 
       walletAddresses, 
       currentBalance, 
       walletInfo, 
       copiedBit, 
       copiedAddress, 
       data,
       errors,
       transactionsList 
    } = this.state;
   const { 
         loading, 
         getWalletAddressesRequesting,
         sendWalletAddressesRequesting,
         getTransactionInfoRequesting
      } = this.props;

   const headers = [
      {
        key: 1,
        name: 'Balance',
        field: 'balance',
      },
      {
        name: 'Transaction Id',
        key: 2,
        format: data => {
          return (
            <>
              <Grid columns='equal'>
              <Grid.Column computer={14} tablet={12} mobile={13}>
                <Popup
                    trigger={  
                    <div className="wallet-address-table">
                      <a href={`https://www.blockchain.com/btc-testnet/tx/${data.txid}`}
                         target="_blank"
                      >
                      {data
                        ? text_truncate(data.txid ?  data.txid : "---", 33) 
                        : '---'}
                      </a>
                      </div>}
                    content={data.txid}
                    basic
                  /> 
              </Grid.Column>
              <Grid.Column computer={2} tablet={4} mobile={3}>
              <Popup
                content={copiedBit ? 'copied' : 'copy'}
                on='click'
                open={copiedAddress === data.txid}
                trigger={<button
                  type="button"
                  name="copyToken"
                  value="copy"
                  className="copyToken ui right icon button"
                  onClick={() => this.copyToClipBoard(data.txid)}
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
        name: 'Status',
        key: 3,
        format: data => {
          return data
            ?
             <>
              <Label color={data.status === 'Received' ? 'green' : ''} horizontal>
                {data.status}
             </Label>
            </> 
            : '---';
        },
      },
      {
        name: 'Created At',
        key: 3,
        format: data => {
          return data.timestamp ? moment(data.timestamp).format('YYYY-MM-DD HH:mm:ss') : '--'
        },
      },      
    ];

   return (
      <div>
        <p className="title">  <i className="icon bitcoin"></i> Bitcoin Wallet </p>
         {!!showReceiveModal && (
           <ReceiveCryptoForm 
             data={data}
             hideModal= {this.hideModal}
             showReceiveModal={showReceiveModal}
             walletOptions={walletAddresses}
             handleDropDown={this.handleDropDown}
             copyToClipBoard= {this.copyToClipBoard}
             copiedBit={copiedBit}
             getWalletAddressesRequesting={getWalletAddressesRequesting}
           />
         )}
          {!!showSendModal && (
           <SendCryptoForm 
             data={data}
             errors={errors}
             hideModal= {this.hideSendModal}
             showSendModal={showSendModal}
             handleChange={this.handleChange}
             submitSendAddress={this.submitSendAddress}
             getWalletAddressesRequesting={sendWalletAddressesRequesting}
             getWalletAddressesRequesting={getWalletAddressesRequesting}
             handleDropDown={this.handleDropDown}
             walletOptions={walletAddresses}
             btcPrice={walletInfo && walletInfo.btc_price}
           />
         )}
        <Grid>
          <Grid.Row>
            <Grid.Column className="text-center">
            <Button 
               content="Receive"
               labelPosition='right'
               icon='download'
               color="orange"
               onClick={this.showReceiveModal}
               className="mr-2"
            />
             <Button 
                content="Send"
                labelPosition='right'
                icon='send'
                color="orange"
                onClick={this.showSendModal}
                className="mr-2"
              />
              </Grid.Column>
              </Grid.Row>
              {loading ? (
                <Grid.Row>
                  <Grid.Column computer={4} tablet={8} mobile={16}>
                   <div className="loader_wallet"></div>
                  </Grid.Column>
                </Grid.Row>
              ) : (
                <>
                  <Grid.Row>
                <Grid.Column computer={4} tablet={8} mobile={16}>
                    <Segment className="stats">
                    <p className="stats__title">BTC Balance</p>
                    <p className="stats__value">{walletInfo && walletInfo.btc_balance ? 
                              `$${walletInfo.btc_balance}` : 'N/A'}</p>
                  </Segment>
                </Grid.Column>
                <Grid.Column computer={4} tablet={8} mobile={16}>
                    <Segment className="stats">
                    <p className="stats__title">BTC Price</p>
                      <p className="stats__value">{walletInfo && walletInfo.btc_price ? 
                        `$${walletInfo.btc_price}` : 'N/A'}</p>
                  </Segment>
                </Grid.Column>
                <Grid.Column computer={4} tablet={8} mobile={16}>
                    <Segment className="stats">
                    <p className="stats__title">USD Balance</p>
                    <p className="stats__value">{walletInfo && walletInfo.usd_balance ? 
                              `$${walletInfo.usd_balance}` : 'N/A'}</p>
                  </Segment>
                </Grid.Column>
                {currentBalance && currentBalance.unconfirmed_balance ? (
                  <Grid.Column computer={4} tablet={8} mobile={16}>
                  <Segment className="stats">
                  <p className="stats__title">Pending BTC Balance</p>
                  <p className="stats__value">{walletInfo && walletInfo.btc_balance ? 
                              `$${walletInfo.btc_balance}` : 'N/A'}</p>
                  </Segment>
                </Grid.Column>
                ) : null }
              </Grid.Row>
              <Divider className="homepage-divider" />
              <Grid.Row>
                <Grid.Column>
                  <h3><b>Transactions</b></h3>
                  <TransactionsTable
                    headers={headers}
                    tableData={transactionsList}
                    requesting={getTransactionInfoRequesting}
                  />
                </Grid.Column>
              </Grid.Row>
                </>
              )}
            
        </Grid>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'wallet', reducer });
const withSaga = injectSaga({ key: 'wallet', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Wallet);
