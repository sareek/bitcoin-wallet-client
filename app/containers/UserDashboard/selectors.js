import { createSelector } from 'reselect';

const selectUserDashboard = (state) => state.get('userDashboard');

const makeSelectSuccess = () => createSelector(selectUserDashboard, (state) => state.get('success'));
const makeSelectResponse = () => createSelector(selectUserDashboard, (state) => state.get('response'));
const makeSelectError = () => createSelector(selectUserDashboard, (state) => state.get('error'));
const makeSelectRequesting = () => createSelector(selectUserDashboard, (state) => state.get('requesting'));
const makeSelectStatus = () => createSelector(selectUserDashboard, (state) => state.get('status'));
const makeSelectCartTotal = () => createSelector(selectUserDashboard, (state) => state.get('cartTotal'));
export { makeSelectSuccess, makeSelectResponse, makeSelectError, makeSelectRequesting, makeSelectStatus, makeSelectCartTotal };
