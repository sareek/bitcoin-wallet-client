import { createSelector } from "reselect";

const selectWatchOnlyAddress = state => state.get("watchOnlyAddress");

const makeSelectSuccess = () => createSelector(selectWatchOnlyAddress, state => state.get('success'));
const makeSelectResponse = () => createSelector(selectWatchOnlyAddress, state => state.get('response'));
const makeSelectError = () => createSelector(selectWatchOnlyAddress, state => state.get('error'));
const makeSelectRequesting = () => createSelector(selectWatchOnlyAddress, state => state.get('requesting'));


export {
  makeSelectSuccess,
  makeSelectResponse,
  makeSelectRequesting,
  makeSelectError
};
