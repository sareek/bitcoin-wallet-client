import { createSelector } from "reselect";

const selectConnections = state => state.get("adminProfileConnections");

const makeSelectConnections = () => createSelector(selectConnections, state => state);

const makeSelectConnectionStatus = () => createSelector(selectConnections, state => state.get('connection_status'));

const makeSelectErrorResponse = () => createSelector(selectConnections, state => state.get('error'));

const makeSelectRequesting = () => createSelector(selectConnections, state => state.get('isLoading'));

const makeSelectSuccessResponse = () => createSelector(selectConnections, state => state.get('response'));

export {
  makeSelectConnections,
  makeSelectRequesting,
  makeSelectErrorResponse,
  makeSelectSuccessResponse,
  makeSelectConnectionStatus
};
