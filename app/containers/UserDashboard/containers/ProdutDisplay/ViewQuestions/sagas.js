import {
  take,
  takeLatest,
  fork,
  call,
  put,
  select,
  cancel,
} from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import * as types from './constants';
import * as actions from './actions';
import TenderKo from 'utils/apiHelper';

function* redirectOnLoadQuestionnaireSuccess() {
  const action = yield take(types.LOAD_ALL_QUESTIONNAIRE_SUCCESS);
  // executed on successful action
  // yield put(push("/next-route"));
}

function* loadAllQuestionnaireService(action) {
  const token = localStorage.getItem('token');
  const { id, package_id } = action;
  const successWatcher = yield fork(redirectOnLoadQuestionnaireSuccess);
  yield fork(
    TenderKo.get(
      `product/questionnaires/${id}?page=1&perpage=100`,
      actions.loadAllQuestionnaireSuccess,
      actions.loadAllQuestionnaireFailure,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.LOAD_ALL_QUESTIONNAIRE_FAILURE]);
  yield cancel(successWatcher);
}


function* redirectOnResultPostSuccess() {
  const action = yield take(types.POST_RESULT_SUCCESS);
  // executed on successful action
  // yield put(push("/next-route"));
}

function* postResultRequest(action) {
  const token = localStorage.getItem('token');
  const successWatcher = yield fork(redirectOnResultPostSuccess);
  const { result } = action;
  yield fork(
    TenderKo.post(
      'mcqs-exam/score',
      actions.postResultSuccess,
      actions.postResultFailure,
      result,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.POST_RESULT_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnQuestionScorePostSuccess() {
  const action = yield take(types.POST_QUESTION_SCORE_SUCCESS);
  // executed on successful action
  // yield put(push("/next-route"));
}

function* postQuestionScoreRequest(action) {
  const token = localStorage.getItem('token');
  const successWatcher = yield fork(redirectOnQuestionScorePostSuccess);
  const { data } = action;
  yield fork(
    TenderKo.post(
      'mcqs-exam/record',
      actions.postQuestionScoreSuccess,
      actions.postQuestionScoreFailure,
      data,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.POST_QUESTION_SCORE_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnSaveAnswerSuccess() {
  const action = yield take(types.SAVE_ANSWER_SUCCESS);
  // executed on successful action
  // yield put(push("/next-route"));
}

function* saveAnswerRequest(action) {
  const token = localStorage.getItem('token');
  const successWatcher = yield fork(redirectOnSaveAnswerSuccess);
  const { payload } = action;
  yield fork(
    TenderKo.post(
      'user-answer',
      actions.saveAnswerSuccess,
      actions.saveAnswerFailure,
      payload,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.POST_RESULT_FAILURE]);
  yield cancel(successWatcher);
}

function* createReportRequest(action) {
  const token = localStorage.getItem('token');
  const { product_id } = action;
  yield fork(
    TenderKo.post(
      `report/create/${product_id}`,
      actions.createReportSuccess,
      actions.createReportFailure,
      {},
      token,
    ),
  );
}


// Individual exports for testing
export default function* viewPracticeWatcher() {
  yield takeLatest(
    types.LOAD_ALL_QUESTIONNAIRE_REQUEST,
    loadAllQuestionnaireService,
  );
  yield takeLatest(types.POST_RESULT_REQUEST, postResultRequest);
  yield takeLatest(types.POST_QUESTION_SCORE_REQUEST, postQuestionScoreRequest);
  yield takeLatest(types.SAVE_ANSWER_REQUEST, saveAnswerRequest);
  yield takeLatest(types.CREATE_REPORT_REQUEST, createReportRequest);
}