import * as types from './constants';
import { fromJS } from 'immutable';
import { LOGOUT_SUCCESS } from "containers/Login/constants";

const initialState = fromJS({
  response: null,
  error: null,
  requesting: false,
  success: false,
  supportTickets: {
    dataList: [],
    totalItems: 0,
    currentPage: 1
  },
  openTickets: {
    dataList: [],
    totalItems: 0,
    currentPage: 1
  },
  requestingOpenTickets: false,
  currentTicket: {}
});

function supportReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_OPEN_TICKETS_REQUEST:
      return state.merge({
        requestingOpenTickets: true
      });
    case types.GET_OPEN_TICKETS_FAILURE:
      return state.merge({
        requestingOpenTickets: false,
        error: action.error.message,
      });
    case types.GET_OPEN_TICKETS_SUCCESS:
      return state
      .merge({
        requestingOpenTickets: false,
        openTickets: fromJS(action.response.data)
      });
    case types.SUBMIT_SUPPORT_REQUEST:
    case types.GET_SUPPORT_TICKET_BY_ID_REQUEST:
    case types.CLOSE_SUPPORT_TICKET_BY_ID_REQUEST:
    case types.REPLY_SUPPORT_TICKET_BY_ID_REQUEST:
    case types.GET_SUPPORT_TICKETS_REQUEST:
      return state.merge({
        requesting: true,
        error: null,
        response: null,
        success: false
      });
    case types.SUBMIT_SUPPORT_SUCCESS:
      return state
      .merge({
        requesting: false,
        response: action.response.message,
        error: null,
        success: true
      }).updateIn(['openTickets', 'dataList'], dataList =>  {
        const newArr = [action.response.data].concat(dataList.toJS());
        return fromJS(newArr);
      })
      .updateIn(['openTickets', 'totalItems'], totalItems => (totalItems + 1));
    case types.GET_SUPPORT_TICKETS_SUCCESS:
      return state
      .merge({
        requesting: false,
        response: null,
        error: null,
        supportTickets: fromJS(action.response.data)
      });
    case types.GET_SUPPORT_TICKET_BY_ID_SUCCESS:
      return state
      .merge({
        requesting: false,
        response: null,
        error: null,
        currentTicket: action.response.data
      });
    case types.REPLY_SUPPORT_TICKET_BY_ID_SUCCESS:
      return state
      .merge({
        requesting: false,
        error: null,
        response: action.response.message,
      }).updateIn(['currentTicket', 'replies'], replies => replies.push(fromJS(action.response.data)));
    case types.CLOSE_SUPPORT_TICKET_BY_ID_SUCCESS:
      return state
      .merge({
        requesting: false,
        error: null,
        // success: true,
        response: action.response.message
      }).updateIn(['supportTickets', 'dataList'], dataList =>  {
        const newList = dataList.map(data => {
          if (data.get('_id') === action.response.data._id) {
            const newData = data.set('status_ticket', action.response.data.status_ticket);
            return newData
          }
          return data;
        });
        return newList;
      }).updateIn(['currentTicket', 'status_ticket'], () => 'closed');
    case types.SUBMIT_SUPPORT_FAILURE:
    case types.GET_SUPPORT_TICKETS_FAILURE:
    case types.GET_SUPPORT_TICKET_BY_ID_FAILURE:
    case types.CLOSE_SUPPORT_TICKET_BY_ID_FAILURE:
    case types.REPLY_SUPPORT_TICKET_BY_ID_FAILURE:
      return state.merge({
        requesting: false,
        response: null,
        error: action.error.message,
        success: false
      });
    case types.CLEAR_RESPONSE:
      return state.merge({
        response: null,
        error: null,
        success: false
      });
    case types.CLEAR_STATE:
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}

export default supportReducer;
