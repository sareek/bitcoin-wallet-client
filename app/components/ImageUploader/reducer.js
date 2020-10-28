/**
 * Created by saroj on 4/13/19.
 */
/*
 *
 * tenderCategory reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';
import { LOGOUT_SUCCESS } from "containers/Login/constants";

const initialState = fromJS({
  response: null,
  xresponse: null,
  error: null,
  requesting: false,
  success: false,
  uploadResponse: {}
});

function imageUploaderReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPLOAD_IMAGE_REQUEST:
      let xresponse = (state.get('response') != null ? state.get('response') : null)
      return state.merge({
        requesting: true,
        success: false,
        response: xresponse,
        xresponse: null,
        error: null
      });
    case types.UPLOAD_IMAGE_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        response: action.response.message,
        error: null,
        uploadResponse: fromJS(action.response.data)
      })
    case types.UPLOAD_IMAGE_FAILURE:
      return state.merge({
        requesting: false,
        success: false,
        response: null,
        error: action.error.message
      });
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default imageUploaderReducer;
