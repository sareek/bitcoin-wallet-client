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
  
export {
  makeSelectResponse,
  makeSelectError,
  makeSelectLoading,
  makeSelectGetWalletAddresses,
  makeSelectCurrentBalance,
  makeSelectGetWalletInfo,
  makeSelectGetWalletAddressesRequesting
};
