import { createSelector } from 'reselect';

const selectDomain = state => state.viewQuestions;

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
const makeSelectGetQuestion = () =>
  createSelector(
    selectDomain,
    state => state.get('getQuestionnaireSuccess'),
  );
const makeSelectGetFavoriteQuestion = () =>
  createSelector(
    selectDomain,
    state => state.get('getFavoriteQuestionnaireSuccess'),
  );
const makeSelectExamDisplay = () =>
  createSelector(
    selectDomain,
    state => state.get('examDisplay'),
  );
const makeSelectTrialQuestions = () =>
  createSelector(
    selectDomain,
    state => state.get('trialQuestions'),
  );
const makeSelectResultResponse = () =>
  createSelector(
    selectDomain,
    state => state.get('resultResponse'),
  );
const makeSelectFavSuccess = () =>
  createSelector(
    selectDomain,
    state => state.get('favresponse'),
  );
const makeSelectFavFaliure = () =>
  createSelector(
    selectDomain,
    state => state.get('faverror'),
  );

const makeSelectSaveAnswerResponse = () =>
createSelector(
  selectDomain,
  state => state.get('saveAnswerResponse'),
);
  
export {
  makeSelectSuccess,
  makeSelectResponse,
  makeSelectError,
  makeSelectRequesting,
  makeSelectGetQuestion,
  makeSelectGetFavoriteQuestion,
  makeSelectExamDisplay,
  makeSelectTrialQuestions,
  makeSelectResultResponse,
  makeSelectFavSuccess,
  makeSelectFavFaliure,
  makeSelectSaveAnswerResponse
};
