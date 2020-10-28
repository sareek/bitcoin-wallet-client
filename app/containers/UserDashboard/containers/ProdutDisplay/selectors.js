import { createSelector } from 'reselect';

// const selectDomain = state => state.get('productDisplay');
const selectDomain = state => state.productDisplay;

const makeSelectSuccess = () => createSelector(selectDomain, state => state.get('success'));
const makeSelectResponse = () => createSelector(selectDomain, state => state.get('response'));
const makeSelectError = () => createSelector(selectDomain, state => state.get('error'));
const makeSelectRequesting = () => createSelector(selectDomain, state => state.get('requesting'));
const makeSelectXResponse = () => createSelector(selectDomain, state => state.get('xresponse'));
const makeSelectDataObj = () => createSelector(selectDomain, state => state.get('dataObj'));
const makeSelectExamDisplay = () => createSelector(selectDomain, state => state.get('examDisplay'));
const makeSelectExams = () => createSelector(selectDomain, state => state.get('exams'));
const makeSelectReportInfo = () => createSelector(selectDomain, state => state.get('reportInfo'));

export {
  makeSelectSuccess,
  makeSelectResponse,
  makeSelectError,
  makeSelectRequesting,
  makeSelectXResponse,
  makeSelectDataObj,
  makeSelectExamDisplay,
  makeSelectExams,
  makeSelectReportInfo
};
