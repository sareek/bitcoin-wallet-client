import { createSelector } from "reselect";

const selectWatchOnlyAddress = state => state.get("watchOnlyAddress");

const makeSelectSuccess = () => createSelector(selectWatchOnlyAddress, state => state.get('success'));
const makeSelectGetWatchOnlyAddressResponse = () => createSelector(selectWatchOnlyAddress, state => state.get('watchOnlyAddressResponse'));
const makeSelectGenerateWatchOnlyAddressResponse = () => createSelector(selectWatchOnlyAddress, state => state.get('generateWatchOnlyAddressResponse'));
const makeSelectError = () => createSelector(selectWatchOnlyAddress, state => state.get('error'));
const makeSelectGetWatchOnlyAddressRequesting = () => createSelector(selectWatchOnlyAddress, state => state.get('getWatchOnlyWalletAddressRequesting'));
const makeSelectPostWatchOnlyAddressRequesting = () => createSelector(selectWatchOnlyAddress, state => state.get('postWatchOnlyWalletAddressRequesting'));
const makeSelectPostWatchOnlyError = () => createSelector(selectWatchOnlyAddress, state => state.get('postWatchOnlyError'));


export {
  makeSelectSuccess,
  makeSelectError,
  makeSelectGetWatchOnlyAddressResponse,
  makeSelectGenerateWatchOnlyAddressResponse,
  makeSelectGetWatchOnlyAddressRequesting,
  makeSelectPostWatchOnlyAddressRequesting,
  makeSelectPostWatchOnlyError,
};
