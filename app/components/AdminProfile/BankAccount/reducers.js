import { fromJS } from "immutable";
import * as types from "./constants";
import { LOGOUT_SUCCESS } from "containers/Login/constants";

const initialState = fromJS({
  response: null,
  error: null,
  requesting: false,
  success: false,
  bankAccount: {}
});

function bankAccountReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_BANK_ACCOUNT_REQUEST:
    case types.ADD_BANK_ACCOUNT_REQUEST:
    case types.DELETE_BANK_DOCUMENT_REQUEST:
      return state.merge({
        requesting: true,
        error: null,
        response: null,
        success: false
      });
    case types.GET_BANK_ACCOUNT_FAILURE:
    case types.ADD_BANK_ACCOUNT_FAILURE:
    case types.DELETE_BANK_DOCUMENT_FAILURE:
      return state.merge({
        requesting: false,
        error: action.error.message,
        response: null,
        success: false
      });
    case types.GET_BANK_ACCOUNT_SUCCESS:
      return state.merge({
        requesting: false,
        error: null,
        success: true,
        response: null,
        bankAccount: action.response.data
      });
    case types.ADD_BANK_ACCOUNT_SUCCESS:
      return state.merge({
        requesting: false,
        error: null,
        success: true,
        response: action.response.message,
        bankAccount: action.response.data
      });
    case types.DELETE_BANK_DOCUMENT_SUCCESS:
      return state.merge({
        requesting: false,
        response: action.response.message,
        error: null,
        success: true
      }).updateIn(["bankAccount", "document"], (bankAccountDocs) => bankAccountDocs.filter(docInfo => docInfo.get('_id') !== action.response.data._id));
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default bankAccountReducer;
