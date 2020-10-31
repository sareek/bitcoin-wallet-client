import { fromJS } from "immutable";
import * as types from "./constants";

export const initialState = fromJS({
  signupResponse: '',
  response: '',
  error: '',
  requesting: false,
  success: true,
  mobile_number_validated: false,
  sms_sent: false,
  is_sms_Requesting: false,
});

function signupReducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGNUP_REQUEST:
      return state.merge({
        requesting: true,
        error: '',
        response: '',
        signupResponse: '',
      });
    case types.VERIFY_REFER_CODE_REQUEST:
      return state.merge({
        requesting:true,
        verify_response: '',
        verify_error: ''
      });
    case types.VERIFY_REFER_CODE_REQ:
      return state.merge({
        requesting:true,
        verify_response: '',
        verify_error: ''
      })
    case types.SIGNUP_SUCCESS:
      return state.merge({
        requesting: false,
        response: action.response.data.message,
        signupResponse: action.response.data.message,
        error: '',
      });
    case types.VERIFY_REFER_CODE_SUCCESS:
      return state.merge({
        requesting: false,
        verify_data: fromJS(action.response.data)
      });
    case types.VERIFY_REFER_CODE_SUC:
      return state.merge({
        requesting: false,
        verify: fromJS(action.response.data)
      });
    case types.SIGNUP_FAILURE:
      return state.merge({
        requesting: false,
        response: '',
        error: action.error.message,
      });
    case types.VERIFY_REFER_CODE_FAILURE:
      return state.merge({
        requesting: false,
      });
    case types.VERIFY_REFER_CODE_FAI:
      return state.merge({
        requesting: false,
      });

    case types.LINK_GOOGLE_FAILURE:
      return state.merge({
        requesting: false,
        response: '',
        error: action.error.message,
      });
    case types.LINK_FACEBOOK_FAILURE:
      return state.merge({
        requesting: false,
        response: '',
        error: action.error.message,
      });
    case types.CLEAR_MESSAGE:
      return state.merge({
        response: '',
        error: '',
      });

    case types.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}

export default signupReducer;
