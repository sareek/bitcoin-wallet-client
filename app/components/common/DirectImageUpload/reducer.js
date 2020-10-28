import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({
  response: '',
  error: '',
  requesting: false,
  success: false,
  imageUploadResponse: '',
  imageList: {
    dataList: [],
    totalItems: 0,
    currentPage: 1,
  },
});

function imageUploadReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.UPLOAD_IMAGE_REQUEST:
    case types.LOAD_MODULE_IMAGE_REQUEST:
      let xresponse =
        state.get('response') != null ? state.get('response') : null;
      return state.merge({
        requesting: true,
        success: false,
        response: xresponse,
        xresponse: null,
        error: null,
      });

    case types.LOAD_MODULE_IMAGE_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        error: '',
        imageList: fromJS(action.response.data),
      });

    case types.UPLOAD_IMAGE_SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        error: null,
        imageUploadResponse: fromJS(action.response.data),
      });

    case types.UPLOAD_IMAGE_FAILURE:
    case types.LOAD_MODULE_IMAGE_FAILURE:
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

    default:
      return state;
  }
}

export default imageUploadReducer;
