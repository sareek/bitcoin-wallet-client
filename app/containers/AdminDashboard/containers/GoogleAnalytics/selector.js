import { createSelector } from 'reselect';

const selectDomain = state => state.get('googleAnalytics');

const makeSelectSuccess = () =>
  createSelector(
    selectDomain,
    state => state.get('success'),
  );
const makeSelectResponse = () =>
  createSelector(
    selectDomain,
    state => state.get('response'),
  );
const makeSelectError = () =>
  createSelector(
    selectDomain,
    state => state.get('error'),
  );
const makeSelectRequesting = () =>
  createSelector(
    selectDomain,
    state => state.get('requesting'),
  );
const makeSelectData = () =>
  createSelector(
    selectDomain,
    state => state.get('dataObj'),
  );
const makeSelectReportData = () =>
  createSelector(
    selectDomain,
    state => state.get('reportData'),
  );

export {
  makeSelectSuccess,
  makeSelectResponse,
  makeSelectError,
  makeSelectRequesting,
  makeSelectData,
  makeSelectReportData,
};
