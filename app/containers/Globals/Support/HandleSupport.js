import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';
import SupportDetails from './SupportDetail';
import saga from './sagas';
import reducer from './reducers';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import {
  makeSelectCurrentSupportTicket,
  makeSelectResponse,
  makeSelectError,
  makeSelectRequesting,
} from './selectors';
import {
  getSupportTicketByIdRequest,
  closeSupportTicketByIdRequest,
  replySupportTicketByIdRequest,
  clearResponse
} from './actions';
import Toaster from 'components/Toaster';

const mapStateToProps = createStructuredSelector({
  supportCurrentTicket: makeSelectCurrentSupportTicket(),
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  requesting: makeSelectRequesting()
});

const mapDispatchToProps = (dispatch) => ({
  getSupportTicketByid: (id) => dispatch(getSupportTicketByIdRequest(id)),
  closeSupportTicketById: (id) => dispatch(closeSupportTicketByIdRequest(id)),
  replySupportTicketById: (id, message) => dispatch(replySupportTicketByIdRequest(id, message)),
  clearResponse: () => dispatch(clearResponse())
});

class HandleSupport extends React.Component {
  static propTypes = {
    getSupportTicketByid: PropTypes.func.isRequired,
    closeSupportTicketById: PropTypes.func.isRequired,
    replySupportTicketById: PropTypes.func.isRequired,
    clearResponse: PropTypes.func.isRequired
  };
  state = {
    message: '',
    details: {},
    cancel: false,
    showMessageBox: false,
    errors: {}
  };

  componentDidMount() {
    this.props.getSupportTicketByid(this.props.detailId);
  }

  componentDidUpdate(prevProps) {
    this.setState({ details: this.props.supportCurrentTicket.toJS() });
  }

  handleReplyClick = (e) =>
    this.setState({
      showMessageBox: true,
    });

  handleCloseCase = () => {
    this.props.closeSupportTicketById(this.props.detailId);
  };

  handleGoBack = () =>
    this.setState({
      cancel: true,
    }, () => {
      this.props.clearResponse();
    });

  handleReplyMessage = (e) => {
    e.preventDefault();
    if (this.state.message) {
      this.props.replySupportTicketById(this.props.detailId, this.state.message);
      this.setState({
        message: '',
        errors: {}
      });
    } else {
      this.setState({
        errors: {
          message: 'Please type some message.'
        }
      })
    }

  };

  handleMessageInput = (e) => this.setState({ message: e.target.value });

  render() {
    const { details, cancel } = this.state;
    if (cancel) {
      return <Redirect to={`/${this.props.user_type || 'user'}/dashboard/support`} />;
    }
    let message = null;
    const { successResponse, errorResponse } = this.props;
    if (successResponse && typeof successResponse === 'string') {
      message = <Toaster message={successResponse} timeout={1000} success />;
    }
    if (errorResponse && typeof errorResponse === 'string') {
      message = <Toaster message={errorResponse} timeout={1000} error />;
    }

    return (
      <div className="left container">
        { message && message }
        <SupportDetails
          details={details}
          handleCloseCase={this.handleCloseCase}
          handleReplyClick={this.handleReplyClick}
          handleGoBack={this.handleGoBack}
          handleReplyMessage={this.handleReplyMessage}
          handleMessageInput={this.handleMessageInput}
        />

        {details.replies &&
        details.replies.map((reply) =>
          (<div key={reply._id}>
            <div className="mg-top-md align-right">
              <div className="brown message inline-block">
                <div className="mg-btm-sm">
                  {reply.reply_message}
                </div>
              </div>
              <p className="text-sm text-muted align-right">
                {reply.added_by}
              </p>
              <p className="text-sm text-muted align-right">
                {reply.added_on}
              </p>
            </div>
          </div>)
        )}

        {(this.state.showMessageBox && details.status_ticket !== 'closed') &&
        <form className="form" onSubmit={this.handleReplyMessage}>
          {/*<TextArea
            label="Message"
            name="message"
            rows="4"
            value={this.state.message}
            onChange={this.handleMessageInput}
            error={this.state.errors.message}
          />*/}
          <Button
            primary
            type="submit"
            disabled={this.props.requesting}
            loading={this.props.requesting}
          >
            Submit
          </Button>
        </form>}
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
)(HandleSupport);
// export default connect(mapStateToProps, mapDispatchToProps)(HandleSupport);
