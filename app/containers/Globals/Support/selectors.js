import { createSelector } from 'reselect';

const selectSupport = state => state.get('globalSupport');

const makeSelectSuccess = () => createSelector(selectSupport, state => state.get('success'));
const makeSelectResponse = () => createSelector(selectSupport, state => state.get('response'));
const makeSelectError = () => createSelector(selectSupport, state => state.get('error'));
const makeSelectRequesting = () => createSelector(selectSupport, state => state.get('requesting'));

const makeSelectSupportTickets = () => createSelector(selectSupport, state => state.get('supportTickets'));
const makeSelectSupportTicketList = () => createSelector(makeSelectSupportTickets(), state => state.get('dataList'));
const makeSelectSupportTicketTotalItems = () => createSelector(makeSelectSupportTickets(), state => state.get('totalItems'));
const makeSelectOpenTickets = () => createSelector(selectSupport, state => state.get('openTickets'));
const makeSelectOpenTicketsRequesting = () => createSelector(selectSupport, state => state.get('requestingOpenTickets'));

const makeSelectCurrentSupportTicket = () => createSelector(selectSupport, state => state.get('currentTicket'));

export {
  makeSelectSuccess,
  makeSelectResponse,
  makeSelectError,
  makeSelectRequesting,
  makeSelectSupportTickets,
  makeSelectSupportTicketList,
  makeSelectSupportTicketTotalItems,
  makeSelectCurrentSupportTicket,
  makeSelectOpenTickets,
  makeSelectOpenTicketsRequesting
};
