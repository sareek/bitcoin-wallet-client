import { fromJS } from "immutable";
import * as types from "./constants";
import { LOGOUT_SUCCESS } from "containers/Login/constants";

const initialState = fromJS({
  isLoading: false,
  response: null,
  error: null,
  connection_status: {
    status_facebook: false,
    status_twitter: false,
    status_google: false,
    status_linkedin: false
  }
});

function connectionsReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_CONNECTION_STATUS_REQUEST:
    case types.LINK_GOOGLE_REQUEST:
    case types.UNLINK_GOOGLE_REQUEST:
    case types.LINK_FACEBOOK_REQUEST:
    case types.UNLINK_FACEBOOK_REQUEST:
    case types.LINK_LINKEDIN_REQUEST:
    case types.UNLINK_LINKEDIN_REQUEST:
    case types.LINK_TWITTER_REQUEST:
    case types.UNLINK_TWITTER_REQUEST:
      return state.merge({
        response: null,
        error: null,
        isLoading: true
      });
    case types.GET_CONNECTION_STATUS_FAILURE:
    case types.LINK_GOOGLE_FAILURE:
    case types.UNLINK_GOOGLE_FAILURE:
    case types.LINK_FACEBOOK_FAILURE:
    case types.UNLINK_FACEBOOK_FAILURE:
    case types.LINK_LINKEDIN_FAILURE:
    case types.UNLINK_LINKEDIN_FAILURE:
    case types.LINK_TWITTER_FAILURE:
    case types.UNLINK_TWITTER_FAILURE:
      return state.merge({
        response: null,
        error: action.error.message,
        isLoading: false
      });
    case types.LINK_GOOGLE_SUCCESS:
      return state.merge({
        isLoading: false,
        error: null,
        response: action.response.message
      })
      .setIn(['connection_status', 'status_google'], true);
    case types.UNLINK_GOOGLE_SUCCESS:
      return state.merge({
        isLoading: false,
        error: null,
        response: action.response.message
      })
      .setIn(['connection_status', 'status_google'], false);
    case types.LINK_FACEBOOK_SUCCESS:
      return state.merge({
        isLoading: false,
        error: null,
        response: action.response.message
      })
      .setIn(['connection_status', 'status_facebook'], true);
    case types.UNLINK_FACEBOOK_SUCCESS:
      return state.merge({
        isLoading: false,
        error: null,
        response: action.response.message
      })
      .setIn(['connection_status', 'status_facebook'], false);
    case types.LINK_LINKEDIN_SUCCESS:
      return state.merge({
        isLoading: false,
        error: null,
        response: action.response.message
      })
      .setIn(['connection_status', 'status_linkedin'], true);
    case types.UNLINK_LINKEDIN_SUCCESS:
      return state.merge({
        isLoading: false,
        error: null,
        response: action.response.message
      })
      .setIn(['connection_status', 'status_linkedin'], false);
    case types.LINK_TWITTER_SUCCESS:
      return state.merge({
        isLoading: false,
        error: null,
        response: action.response.message
      })
      .setIn(['connection_status', 'status_twitter'], true);
    case types.UNLINK_TWITTER_SUCCESS:
      return state.merge({
        isLoading: false,
        error: null,
        response: action.response.message
      })
      .setIn(['connection_status', 'status_twitter'], false);
    case types.GET_CONNECTION_STATUS_SUCCESS:
      return state.merge({
        isLoading: false,
        error: null,
        response: null,
        connection_status: action.response.data
      });
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default connectionsReducer;
