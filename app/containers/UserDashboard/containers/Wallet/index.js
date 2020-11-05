import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { showDialog } from 'containers/App/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './sagas';
import { compose } from 'redux';
import bitcoinLogo from 'assets/images/exchange/additional/bitcoin.svg'
import {
  makeSelectLoading,
  makeSelectNewAddress,
  makeSelectCurrentBalance,
  makeSelectGetWalletInfo,
  makeSelectError
} from './selectors';
import { Button, Grid, Segment } from 'semantic-ui-react';
import ReceiveCryptoForm from './components/ReceiveCryptoForm';
import { Redirect } from 'react-router-dom';

import {
  getNewAddressRequest,
  getBalanceRequest,
  getWalletInfoRequest,
} from './actions'

const mapStateToProps = createStructuredSelector({
  newAddress: makeSelectNewAddress(),
  currentBalance: makeSelectCurrentBalance(),
  walletInfo: makeSelectGetWalletInfo(),
  loading: makeSelectLoading(),
  error: makeSelectError() 
});

const mapDispatchToProps = dispatch => ({
  showDialog: dialog => dispatch(showDialog(dialog)),
  dispatchGetNewAddressRequest: () => dispatch(getNewAddressRequest()),
  dispatchGetWalletInfoRequest: () => dispatch(getWalletInfoRequest()),
  dispatchGetBalanceRequest: (walletInfo) => dispatch(getBalanceRequest(walletInfo))
});

class Wallet extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        showReceiveModal: false,
        newAddress: {},
        currentBalance: {},
        walletInfo: {},
        copiedBit: false
       };
  }
  componentDidMount() {
    this.props.dispatchGetWalletInfoRequest();
  }

  componentDidUpdate(prevProps) {
    if(this.props.error === "Unauthorized user / session expired") {
      localStorage.removeItem("token");
      return <Redirect to={'/'} />;
   }
    if (this.props.newAddress != prevProps.newAddress) {
      this.setState({
        newAddress: this.props.newAddress && this.props.newAddress.toJS(),
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
        if(this.state.walletInfo && this.state.walletInfo.btc_address && this.state.walletInfo.btc_address !== 'NA') this.props.dispatchGetBalanceRequest(this.state.walletInfo);
      });
    }  
  }

  showReceiveModal = () => {
    this.props.dispatchGetNewAddressRequest()
    this.setState({showReceiveModal: true})
  }

  hideModal = () => {
    this.setState({showReceiveModal: false})
    this.props.dispatchGetWalletInfoRequest();
  }

  copyToClipBoard = (address) => {
    var dummyElement = document.createElement('input'),
      copyText = address;
    document.body.appendChild(dummyElement);
    dummyElement.value = copyText;
    dummyElement.select();
    document.execCommand('copy');
    document.body.removeChild(dummyElement);
    this.setState({copiedBit: true});
    setTimeout(() => {
      this.setState({copiedBit: false});
    }, 1000);
  };

  render() {
   const { showReceiveModal, newAddress, currentBalance, walletInfo, copiedBit } = this.state;
   const { loading } = this.props;
    return (
      <div>
         {/* <h1>  <img style={{height: '2rem', width: '2rem'}} src={bitcoinLogo} alt="bitcoin_img" /> BitCoin Wallet </h1> */}
          <h1 className="title">  <i className="icon bitcoin"></i> Bitcoin Wallet </h1>
          
         <br />
         {!!showReceiveModal && (
           <ReceiveCryptoForm 
             hideModal= {this.hideModal}
             showReceiveModal={showReceiveModal}
             newAddress={newAddress}
             copyToClipBoard= {this.copyToClipBoard}
             copiedBit={copiedBit}
           />
         )}
        <Grid>
          <Grid.Row>
            <Grid.Column>
            <Button 
               content="Receive"
               labelPosition='right'
               icon='download'
               onClick={this.showReceiveModal}
               color="blue"
            />
             <Button 
                content="Send"
                labelPosition='right'
                icon='send'
                color="blue"
                disabled
              />
              </Grid.Column>
              </Grid.Row>
              {loading ? (
                <Grid.Row>
                  <Grid.Column width={4}>
                   <div className="loader_wallet"></div>
                  </Grid.Column>
                </Grid.Row>
              ) : (
                <>
                  <Grid.Row>
                <Grid.Column width={4}>
                    <Segment className="stats">
                    <p className="stats__title">BTC Balance</p>
                    <p className="stats__value">{walletInfo && walletInfo.btc_balance ? 
                              `$${walletInfo.btc_balance}` : 'N/A'}</p>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment className="stats">
                    <p className="stats__title">BTC Price</p>
                      <p className="stats__value">{walletInfo && walletInfo.btc_price ? 
                        `$${walletInfo.btc_price}` : 'N/A'}</p>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment className="stats">
                    <p className="stats__title">USD Balance</p>
                    <p className="stats__value">{walletInfo && walletInfo.usd_balance ? 
                              `$${walletInfo.usd_balance}` : 'N/A'}</p>
                  </Segment>
                </Grid.Column>
                {currentBalance && currentBalance.unconfirmed_balance ? (
                  <Grid.Column width={4}>
                  <Segment className="stats">
                  <p className="stats__title">Pending BTC Balance</p>
                  <p className="stats__value">{walletInfo && walletInfo.btc_balance ? 
                              `$${walletInfo.btc_balance}` : 'N/A'}</p>
                  </Segment>
                </Grid.Column>
                ) : null }
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <p><b>Transactions</b></p>
                  <p>All your Bitcoin transactions will show up here.</p>
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
