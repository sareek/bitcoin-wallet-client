import { createSelector } from 'reselect';

const selectDomain = state => state.get('userConfirmation');

const makeSelectSuccess = () => createSelector(selectDomain, state => state.get('success'));
const makeSelectResponse = () => createSelector(selectDomain, state => state.get('response'));
const makeSelectError = () => createSelector(selectDomain, state => state.get('error'));
const makeSelectRequesting = () => createSelector(selectDomain, state => state.get('requesting'));

export {
  makeSelectSuccess,
  makeSelectResponse,
  makeSelectError,
  makeSelectRequesting,
};
