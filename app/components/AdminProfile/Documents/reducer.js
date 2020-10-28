import { fromJS } from "immutable";
import * as types from "./constants";
import { LOGOUT_SUCCESS } from "containers/Login/constants";

const initialState = fromJS({
  requesting: false,
  success: false,
  response: null,
  error: null,
  documents: {
    submitted_documents: [],
    approval_documents: []
  }
});

function documentsReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_MY_PROFILE:
      return state.merge({
        requesting: true,
        error: null,
        response: null,
        success: false
      });
    case types.LOAD_MY_PROFILE_SUCCESS:
      return state.merge({
        requesting: false,
        response: null,
        error: null,
        success: true,
        documents: action.myProfile.data.imp_info[0]
      });
    case types.LOAD_MY_PROFILE_FAILURE:
      return state.merge({
        requesting: false,
        response: null,
        error: action.error.message,
        success: false
      });
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default documentsReducer;
