/*
 *
 * ViewPractice reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';
import { LOGOUT_SUCCESS } from 'containers/Login/constants';

const initialState = fromJS({
  response: '',
  error: '',
  requesting: false,
  success: false,
  getQuestionnaireSuccess: {},
  getFavoriteQuestionnaireSuccess: [],
  examDisplay: {},
  trialQuestions: {},
  resultResponse: {},
  faverror: '',
  favresponse: '',
  saveAnswerResponse: {}
});

function viewPracticeReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.CREATE_REPORT_REQUEST:
    case types.SAVE_ANSWER_REQUEST:
    case types.LOAD_ALL_QUESTIONNAIRE_REQUEST:
    case types.POST_RESULT_REQUEST:
    case types.POST_QUESTION_SCORE_REQUEST:
      return state.merge({
        requesting: true,
        success: false,
        response: '',
        error: '',
        faverror: '',
        favresponse: '',
        saveAnswerResponse: {}
      });
    case types.POST_QUESTION_SCORE_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        response: action.response.message,
        error: '',
      });
    case types.LOAD_ALL_QUESTIONNAIRE_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        response: action.response.message,
        getQuestionnaireSuccess: fromJS(action.response.data.dataList),
        error: '',
      });
  
    case types.POST_RESULT_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        response: action.response.message,
        error: null,
        resultResponse: fromJS(action.response.data),
      });

    case types.SAVE_ANSWER_SUCCESS:
    return state.merge({
      requesting: false,
      success: true,
      response: action.response.message,
      error: null,
      saveAnswerResponse: fromJS(action.response.data),
    });  

    case types.CREATE_REPORT_SUCCESS:
        return state.merge({
          requesting: false,
          success: true,
          response: action.response.message,
          error: null,
    }); 

    case types.SAVE_ANSWER_FAILURE:  
    case types.LOAD_ALL_QUESTIONNAIRE_FAILURE:
    case types.POST_RESULT_FAILURE:
    case types.POST_QUESTION_SCORE_FAILURE:
    case types.CREATE_REPORT_FAILURE:
      return state.merge({
        requesting: false,
        success: false,
        response: '',
        error: action.error.message,
      });

    case types.CLEAR_MESSAGE:
      return state.merge({
        requesting: false,
        success: false,
        response: '',
        error: '',
        faverror: '',
        favresponse: '',
      });

    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default viewPracticeReducer;
