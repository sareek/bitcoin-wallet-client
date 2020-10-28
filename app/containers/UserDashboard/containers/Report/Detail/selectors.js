import { createSelector } from 'reselect';

export const graphData = state => state.reportDetail;

const makeSelectResponse = () =>
  createSelector(
    graphData,
    state => state.get('response'),
  );
const makeSelectError = () =>
  createSelector(
    graphData,
    state => state.get('error'),
  );
const makeSelectLoading = () =>
  createSelector(
    graphData,
    state => state.get('requesting'),
  );

const makeSelectGraphData = () =>
createSelector(
  graphData,
  state => state.get('graphData'),
);  

export {
  makeSelectResponse,
  makeSelectError,
  makeSelectLoading,
  makeSelectGraphData
};
