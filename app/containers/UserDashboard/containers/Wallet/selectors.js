import { createSelector } from 'reselect';

export const selectWallet = state => state.get("wallet");

const makeSelectResponse = () =>
  createSelector(
    selectWallet,
    state => state.get('response'),
  );
const makeSelectGetWalletAddresses = () =>
  createSelector(
    selectWallet,
    state => state.get('walletAddresses'),
  );
const makeSelectCurrentBalance = () =>
  createSelector(
    selectWallet,
    state => state.get('currentBalance'),
  );  
const makeSelectGetWalletInfo= () =>
  createSelector(
    selectWallet,
    state => state.get('walletInfo'),
  );   
const makeSelectError = () =>
  createSelector(
    selectWallet,
    state => state.get('error'),
  );

const makeSelectLoading = () =>
  createSelector(
    selectWallet,
    state => state.get('loading'),
  );
 
const makeSelectGetWalletAddressesRequesting = () =>
  createSelector(
    selectWallet,
    state => state.get('getWalletAddressesRequesting'),
  ); 

const makeSelectSendWalletAddressesRequesting = () =>
  createSelector(
    selectWallet,
    state => state.get('sendWalletAddressRequesting'),
  ); 
const makeSelectSendWalletAddressesResponse = () =>
  createSelector(
    selectWallet,
    state => state.get('sendWalletAddressResponse'),
  ); 
const makeSelectSendWalletAddressesError = () =>
  createSelector(
    selectWallet,
    state => state.get('sendWalletAddressError'),
  );   

const makeSelectGetTransactionInfoRequesting = () =>
  createSelector(
    selectWallet,
    state => state.get('getTransactionInfoRequesting'),
  ); 
const makeSelectGetTransactionInfoResponse = () =>
  createSelector(
    selectWallet,
    state => state.get('getTransactionInfoResponse'),
  ); 
const makeSelectGetTransactionInfoError = () =>
  createSelector(
    selectWallet,
    state => state.get('getTransactionInfoError'),
  );   
  
export {
  makeSelectResponse,
  makeSelectError,
  makeSelectLoading,
  makeSelectGetWalletAddresses,
  makeSelectCurrentBalance,
  makeSelectGetWalletInfo,
  makeSelectGetWalletAddressesRequesting,
  makeSelectSendWalletAddressesRequesting,
  makeSelectSendWalletAddressesResponse,
  makeSelectSendWalletAddressesError,
  makeSelectGetTransactionInfoRequesting,
  makeSelectGetTransactionInfoResponse,
  makeSelectGetTransactionInfoError
};
