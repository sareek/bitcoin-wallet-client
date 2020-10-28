import { createSelector } from 'reselect';

export const selectWallet = state => state.get("wallet");

const makeSelectResponse = () =>
  createSelector(
    selectWallet,
    state => state.get('response'),
  );
const makeSelectNewAddress = () =>
  createSelector(
    selectWallet,
    state => state.get('newAddress'),
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

export {
  makeSelectResponse,
  makeSelectError,
  makeSelectLoading,
  makeSelectNewAddress,
  makeSelectCurrentBalance,
  makeSelectGetWalletInfo
};
