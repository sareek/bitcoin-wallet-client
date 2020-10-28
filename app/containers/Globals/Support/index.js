import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { makeSelectUser } from 'containers/App/selectors';
import Toaster from 'components/Toaster';
import Spinner from 'components/common/Spinner'
import SupportForm from './SupportForm';
import saga from './sagas';
import reducer from './reducers';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import {
  getSupportTicketsRequest, submitSupportRequest, clearResponse, getOpenTicketsRequest
} from './actions';
import SupportTable from './SupportTable';
import './support.css';
import {
  makeSelectSupportTickets, makeSelectSupportTicketList, makeSelectSupportTicketTotalItems,
  makeSelectRequesting, makeSelectResponse, makeSelectError, makeSelectSuccess,
  makeSelectOpenTickets, makeSelectOpenTicketsRequesting
} from './selectors';
import HandleSupport from './HandleSupport';
import parseSupportType from './utils/parseSupportType';
import parseSeverityType from './utils/parseSeverityType';
import parseDate from './utils/parseDate';

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  supportTickets: makeSelectSupportTickets(),
  supportTicketList: makeSelectSupportTicketList(),
  totalClosedTickets: makeSelectSupportTicketTotalItems(),
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  isRequesting: makeSelectRequesting(),
  success: makeSelectSuccess(),
  openTickets: makeSelectOpenTickets(),
  openRequesting: makeSelectOpenTicketsRequesting()
});

const mapDispatchToProps = (dispatch) => ({
  clearResponse: () => dispatch(clearResponse()),
  submitSupportRequest: (data) => dispatch(submitSupportRequest(data)),
  getSupportTickets: (page, perpage, query) => dispatch(getSupportTicketsRequest(page, perpage, query, '')),
  getOpenTickets: (page = '', perpage = '', query = {}) => dispatch(getOpenTicketsRequest(page, perpage, query, '')),
  navigateToSupportDetails: (url) => dispatch(push(url))
});

class Support extends React.Component {
  static propTypes = {
    clearResponse: PropTypes.func.isRequired,
    submitSupportRequest: PropTypes.func.isRequired,
    getSupportTickets: PropTypes.func.isRequired,
    getOpenTickets: PropTypes.func.isRequired,
    navigateToSupportDetails: PropTypes.func.isRequired,
    isRequesting: PropTypes.bool.isRequired,
    openRequesting: PropTypes.bool.isRequired,
    totalClosedTickets: PropTypes.number.isRequired,
  };
  state = {
    page: 1, perPage: 10,
    showForm: false,
    tickets: [],
    query: {
      name: '', subject: '',
      support_type: this.props.support_type || '',
    },
    success: false,
    openTickets: []
  };
  componentWillMount() {
    window.scrollTo(0, 0);
  }
  componentDidMount() {
    const { page, perPage, query } = this.state;
    this.props.getSupportTickets(page, perPage, query);
    this.props.getOpenTickets();
  }
  componentDidUpdate(prevProps) {
    this.setState({ success: this.props.success });
    if (prevProps.openTickets !== this.props.openTickets) {
      const openTickets = this.props.openTickets.get('dataList').toJS();
      this.setState({ openTickets })
    }
  }
  onPaginate = (page, perPage) => {
    this.setState({ page, perPage });
    this.props.getSupportTickets(page, perPage, this.state.query);
  };
  onQueryChange = (e) => {
    e.persist();
    this.setState(state => ({
      query: {
        ...state.query,
        [e.target.name]: e.target.value,
      },
    }));
  };
  doSearch = () =>
    this.props.getSupportTickets(1, this.state.perPage, this.state.query);
  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm }, () => {
      if (!this.state.showForm) {
        this.props.clearResponse();
      }
    });
  };
  render() {
    const { page, perPage, query, showForm, openTickets } = this.state;
    const {
      submitSupportRequest, user, successResponse, errorResponse, isRequesting,
      supportTickets, user_type, totalClosedTickets, 
    } = this.props;
    
    let message;
    if (successResponse && typeof successResponse === 'string') {
      message = <Toaster message={successResponse} timeout={1000} success />;
    }
    if (errorResponse && typeof errorResponse === 'string') {
      message = <Toaster message={errorResponse} timeout={1000} error />;
    }
    const actions = [
      { key: 1, format: (data) =>
          <Link to={`/${user_type || 'user'}/dashboard/support/edit/${data._id}`} key={`action_1_${data._id}`}>
            <i className="icon icon-eye" />
          </Link>, },
    ];
    const headers = [
      { name: 'Subject', field: 'subject', key: 1, },
      { name: 'Support Type', field: 'support_type', key: 2 },
      { name: 'Severity', field: 'support_severity', key: 3 },
      { name: 'Status', field: 'status_ticket', key: 4 },
      { name: 'Actions', key: 5, format: data => {
          return (
            <div className="action">
              {actions.map(action => action.format(data))}
            </div>);
        }}
    ];

    if (this.props.match && this.props.match.params.id) {
      return (
        <HandleSupport user_type={this.props.user_type} detailId={this.props.match.params.id} />
      );
    }
    return (
      <div className="support container left">
        {message && message}
        <h2>Support</h2>
        {showForm ?
          <SupportForm cancelForm={this.toggleForm} success={this.state.success}
                       submitSupportRequest={submitSupportRequest} user={user} requesting={isRequesting}
          /> : (
            <div className="">
              <span className="button primary mg-btm-sm" onClick={this.toggleForm}>
                Create Support Ticket
              </span>
              {this.props.openRequesting ? <Spinner /> :
                (openTickets.length === 0) ? (
                  <div className="segment">
                    You don't have open tickets
                  </div>
                ): (
                  <div className="segment">
                    <h4 className="uppercase">Open Tickets</h4>
                    {
                      openTickets.map(ticket => {
                        return (
                          <div className="rounded pd-all-sm bg-blue mg-btm-sm pointer" key={ticket._id} onClick={() => this.props.navigateToSupportDetails(`/${this.props.user_type || 'user'}/dashboard/support/edit/${ticket._id}`)}>
                            <h4>{ticket.subject}</h4>
                            <p>Date: {parseDate(ticket.added_on)} | Type:  {parseSupportType(ticket.support_type)} | Severity: {parseSeverityType(ticket.support_severity)}</p>
                          </div>
                        );
                      })
                    }
                  </div>
                )}
              <SupportTable
                showClosedTableFilterForm={true}
                query={query} onQueryChange={this.onQueryChange} doSearch={this.doSearch}
                headers={headers} tableData={supportTickets} loading={isRequesting}
                page={page} perPage={perPage} onPaginate={this.onPaginate}
              />
            </div>
          )}
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'globalSupport', reducer });
const withSaga = injectSaga({ key: 'globalSupport', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Support);
