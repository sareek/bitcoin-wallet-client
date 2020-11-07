import { createSelector } from 'reselect';

export const selectWallet = state => state.get("dashboardMain");

const makeSelectResponse = () =>
  createSelector(
    selectWallet,
    state => state.get('response'),
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
const makeSelectUser = () => createSelector(selectWallet, state => state.get('user'));  

export {
  makeSelectResponse,
  makeSelectError,
  makeSelectLoading,
  makeSelectUser
};
