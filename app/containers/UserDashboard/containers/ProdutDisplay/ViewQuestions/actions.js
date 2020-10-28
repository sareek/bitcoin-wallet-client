/*
 *
 * ViewPractice actions
 *
 */

import action from 'utils/action';
import * as types from './constants';

export const createReportRequest = action(
  types.CREATE_REPORT_REQUEST,
  'product_id',
);
export const createReportSuccess = action(
  types.CREATE_REPORT_SUCCESS,
  'response',
);
export const createReportFailure = action(
  types.CREATE_REPORT_FAILURE,
  'error',
);


export const saveAnswerRequest = action(
  types.SAVE_ANSWER_REQUEST,
  'payload',
);
export const saveAnswerSuccess = action(
  types.SAVE_ANSWER_SUCCESS,
  'response',
);
export const saveAnswerFailure = action(
  types.SAVE_ANSWER_FAILURE,
  'error',
);

export const defaultActionRequest = action(
  types.DEFAULT_ACTION_REQUEST,
  'payload',
);
export const defaultActionSuccess = action(
  types.DEFAULT_ACTION_SUCCESS,
  'response',
);
export const defaultActionFailure = action(
  types.DEFAULT_ACTION_FAILURE,
  'error',
);

export const loadAllQuestionnaireRequest = action(
  types.LOAD_ALL_QUESTIONNAIRE_REQUEST,
  'id',
  'package_id',
);
export const loadAllQuestionnaireSuccess = action(
  types.LOAD_ALL_QUESTIONNAIRE_SUCCESS,
  'response',
);
export const loadAllQuestionnaireFailure = action(
  types.LOAD_ALL_QUESTIONNAIRE_FAILURE,
  'error',
);

export const postQuestionScoreRequest = action(
  types.POST_QUESTION_SCORE_REQUEST,
  'data',
);
export const postQuestionScoreSuccess = action(
  types.POST_QUESTION_SCORE_SUCCESS,
  'response',
);
export const postQuestionScoreFailure = action(
  types.POST_QUESTION_SCORE_FAILURE,
  'error',
);

export const postResultRequest = action(types.POST_RESULT_REQUEST, 'result');
export const postResultSuccess = action(types.POST_RESULT_SUCCESS, 'response');
export const postResultFailure = action(types.POST_RESULT_FAILURE, 'error');

export const clearMessage = action(types.CLEAR_MESSAGE);
