import { createSelector } from "reselect";

const selectWalletListInfo = state => state.get("walletsList");

const makeSelectSuccess = () => createSelector(selectWalletListInfo, state => state.get('success'));
const makeSelectWalletAddressesResponse = () => createSelector(selectWalletListInfo, state => state.get('walletAddressesResponse'));
const makeSelectError = () => createSelector(selectWalletListInfo, state => state.get('error'));
const makeSelectRequesting = () => createSelector(selectWalletListInfo, state => state.get('requesting'));
const makeSelectUser = () => createSelector(selectWalletListInfo, state => state.get('user'));

const makeSelectPostWalletAddressResponse = () => createSelector(selectWalletListInfo, state => state.get('postAddressResponse'));

export {
  makeSelectSuccess,
  makeSelectWalletAddressesResponse,
  makeSelectRequesting,
  makeSelectError,
  makeSelectUser,
  makeSelectPostWalletAddressResponse
};
