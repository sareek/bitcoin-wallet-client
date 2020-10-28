import { createSelector } from "reselect";

const selectBankAccount = state => state.get("adminProfileBankAccount");

const makeSelectSuccess = () => createSelector(selectBankAccount, state => state.get('success'));
const makeSelectResponse = () => createSelector(selectBankAccount, state => state.get('response'));
const makeSelectError = () => createSelector(selectBankAccount, state => state.get('error'));
const makeSelectRequesting = () => createSelector(selectBankAccount, state => state.get('requesting'));

const makeSelectBankAccountInfo = () => createSelector(selectBankAccount, state => state.get('bankAccount'));



export {
  makeSelectSuccess,
  makeSelectBankAccountInfo,
  makeSelectRequesting,
  makeSelectError,
  makeSelectResponse
};
