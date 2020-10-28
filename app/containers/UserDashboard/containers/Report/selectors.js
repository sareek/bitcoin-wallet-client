import { createSelector } from 'reselect';
import { initialState } from  './reducer';
import { FormattedHTMLMessage } from 'react-intl';

export const getMyReports = state => state.report || initialState;

const makeSelectResponse = () =>
  createSelector(
    getMyReports,
    state => state.get('response'),
  );
  const makeSelectReportList = () =>
  createSelector(
    getMyReports,
    state => state.get('reportList'),
  );
const makeSelectError = () =>
  createSelector(
    getMyReports,
    state => state.get('error'),
  );
  // const makeSelectLoading = () =>
  // createSelector(
  //   getMyReports,
  //   state => state.get('requesting'),
  // );
  const makeSelectLoading = () =>
  createSelector(
    graphData,
    state => state.get('requesting'),
  );

  const makeSelectPublicURL = () =>
  createSelector(
    getMyReports,
    state => state.get('public_url'),
  );


export {
  makeSelectResponse,
  makeSelectError,
  makeSelectLoading,
  makeSelectReportList,
  makeSelectPublicURL
};
