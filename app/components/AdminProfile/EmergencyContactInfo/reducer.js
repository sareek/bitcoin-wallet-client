import { fromJS } from "immutable";
import * as types from "./constants";
import { LOGOUT_SUCCESS } from "containers/Login/constants";

const initialState = fromJS({
  response: null,
  error: null,
  requesting: false,
  success: false,
  emergencyContacts: []
});

function emergencyContactInfoReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_EMERGENCY_CONTACT_INFO_REQUEST:
    case types.UPDATE_EMERGENCY_CONTACT_INFO_REQUEST:
    case types.ADD_EMERGENCY_CONTACT_INFO_REQUEST:
    case types.REMOVE_EMERGENCY_CONTACT_INFO_REQUEST:
      return state.merge({
        requesting: true,
        error: null,
        response: null,
        success: false
      });
    case types.GET_EMERGENCY_CONTACT_INFO_FAILURE:
    case types.UPDATE_EMERGENCY_CONTACT_INFO_FAILURE:
    case types.ADD_EMERGENCY_CONTACT_INFO_FAILURE:
    case types.REMOVE_EMERGENCY_CONTACT_INFO_FAILURE:
      return state.merge({
        requesting: false,
        response: null,
        error: action.error.message,
        success: false
      });
    case types.GET_EMERGENCY_CONTACT_INFO_SUCCESS:
      return state.merge({
        requesting: false,
        response: null,
        error: null,
        success: true,
        emergencyContacts: action.response.data
      });
    case types.ADD_EMERGENCY_CONTACT_INFO_SUCCESS:
      return state.merge({
        requesting: false,
        response: action.response.message,
        error: null,
        success: true
      }).update("emergencyContacts", emergencyContacts =>
        emergencyContacts.push(fromJS(action.response.data))
      );
    case types.UPDATE_EMERGENCY_CONTACT_INFO_SUCCESS:
      return state.merge({
        requesting: false,
        response: action.response.message,
        error: null,
        success: true
      }).update("emergencyContacts", emergencyContacts =>
        emergencyContacts.map(i =>
          i.get('_id') !== action.response.data._id ? i : fromJS(action.response.data)
        )
      );
    case types.REMOVE_EMERGENCY_CONTACT_INFO_SUCCESS:
      return state.merge({
        requesting: false,
        response: action.response.message,
        error: null,
        success: true
      }).update("emergencyContacts", emergencyContacts =>
        emergencyContacts.filter(emergencyContact =>
        emergencyContact.get('_id') !== action.response.data._id));
    case types.EMERGENCY_CONTACT_INFO_CLEAR_MESSAGES:
    case types.EMERGENCY_CONTACT_INFO_CLEAR_ERRORS:
      return state.merge({
        response: null,
        error: null
      });
    case types.EMERGENCY_CONTACT_INFO_CLEAR_STATE:
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default emergencyContactInfoReducer;
