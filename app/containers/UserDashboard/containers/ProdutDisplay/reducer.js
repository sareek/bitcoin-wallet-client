/*
 *
 * ExamDisplay reducer
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
  dataObj: [],
  exams: [],
  examDisplay: null,
  reportInfo: null
});

function examDisplayReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOAD_ALL_EXAM_REQUEST:
    case types.LOAD_EXAM_BY_ID_REQUEST:
    case types.LOAD_PACKAGE_EXAMS_REQUEST:
      let xresponse =
        state.get('response') != null ? state.get('response') : null;
      return state.merge({
        requesting: true,
        success: false,
        response: xresponse,
        xresponse: null,
        error: null,
        reportInfo: null
      });

    case types.LOAD_ALL_EXAM_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        response: xresponse,
        error: null,
        dataObj: fromJS(action.response.data.dataList),
      });

    case types.LOAD_PACKAGE_EXAMS_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        response: xresponse,
        error: null,
        exams: fromJS(action.response.data.dataList),
        reportInfo: fromJS(action.response.data.reportInfo)
      });

    case types.LOAD_EXAM_BY_ID_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        response: action.response.message,
        error: null,
        examDisplay: fromJS(action.response.data.dataList),
      });

    case types.LOAD_ALL_EXAM_FAILURE:
    case types.LOAD_EXAM_BY_ID_FAILURE:
    case types.LOAD_PACKAGE_EXAMS_FAILURE:
      return state.merge({
        requesting: false,
        success: false,
        response: null,
        error: action.error.message,
      });

    case types.CLEAR_MESSAGE:
      return state.merge({
        response: null,
        error: null,
      });

    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default examDisplayReducer;
