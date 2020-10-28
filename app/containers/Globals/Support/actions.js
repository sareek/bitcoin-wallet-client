import * as types from './constants';
import action from "utils/action";

export const submitSupportRequest = action(types.SUBMIT_SUPPORT_REQUEST, 'payload');
export const submitSupportSuccess = action(types.SUBMIT_SUPPORT_SUCCESS, 'response');
export const submitSupportFailure = action(types.SUBMIT_SUPPORT_FAILURE, 'error');

export const getSupportTicketsRequest = action(types.GET_SUPPORT_TICKETS_REQUEST, 'page', 'perpage', 'query',
  'support_type');
export const getSupportTicketsSuccess = action(types.GET_SUPPORT_TICKETS_SUCCESS, 'response');
export const getSupportTicketsFailure = action(types.GET_SUPPORT_TICKETS_FAILURE, 'error');

export const getSupportTicketByIdRequest = action(types.GET_SUPPORT_TICKET_BY_ID_REQUEST, 'payload');
export const getSupportTicketByIdSuccess = action(types.GET_SUPPORT_TICKET_BY_ID_SUCCESS, 'response');
export const getSupportTicketByIdFailure = action(types.GET_SUPPORT_TICKET_BY_ID_FAILURE, 'error');

export const closeSupportTicketByIdRequest = action(types.CLOSE_SUPPORT_TICKET_BY_ID_REQUEST, 'payload');
export const closeSupportTicketByIdSuccess = action(types.CLOSE_SUPPORT_TICKET_BY_ID_SUCCESS, 'response');
export const closeSupportTicketByIdFailure = action(types.CLOSE_SUPPORT_TICKET_BY_ID_FAILURE, 'error');

export const replySupportTicketByIdRequest = action(types.REPLY_SUPPORT_TICKET_BY_ID_REQUEST, 'payload', 'message');
export const replySupportTicketByIdSuccess = action(types.REPLY_SUPPORT_TICKET_BY_ID_SUCCESS, 'response');
export const replySupportTicketByIdFailure = action(types.REPLY_SUPPORT_TICKET_BY_ID_FAILURE, 'error');

export const clearState = action(types.CLEAR_STATE);
export const clearResponse = action(types.CLEAR_RESPONSE);

export const getOpenTicketsRequest = action(types.GET_OPEN_TICKETS_REQUEST, 'page', 'perpage', 'query',
  'support_type');
export const getOpenTicketsSuccess = action(types.GET_OPEN_TICKETS_SUCCESS, 'response');
export const getOpenTicketsFailure = action(types.GET_OPEN_TICKETS_FAILURE, 'error');
