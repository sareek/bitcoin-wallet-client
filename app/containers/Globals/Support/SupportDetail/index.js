//not used for now as of this inspection
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, TextArea } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';
import SupportDetails from './supportDetails';
import saga from '../sagas';
import reducer from '../reducers';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';

import {
  makeSelectCurrentSupportTicket,
  makeSelectResponse,
  makeSelectError,
  makeSelectRequesting
} from '../selectors';
import {
  getSupportTicketByIdRequest,
  closeSupportTicketByIdRequest,
  replySupportTicketByIdRequest,
  clearResponse
} from '../actions';
import Toaster from 'components/Toaster';
// import TextArea from 'components/common/Forms/TextArea';
import Spinner from 'components/common/Spinner';

const mapStateToProps = createStructuredSelector({
  supportCurrentTicket: makeSelectCurrentSupportTicket(),
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  requesting: makeSelectRequesting() // there should be a requesting for support detail get only. and another for reply and close case
});

const mapDispatchToProps = (dispatch) => ({
  getSupportTicketByid: (id) => dispatch(getSupportTicketByIdRequest(id)),
  closeSupportTicketById: (id) => dispatch(closeSupportTicketByIdRequest(id)),
  replySupportTicketById: (id, message) => dispatch(replySupportTicketByIdRequest(id, message)),
  clearResponse: () => dispatch(clearResponse())
});

class HandleSupport extends React.Component {
  state = {
    message: '',
    details: {},
    cancel: false,
    showMessageBox: false,
    errors: {}
  };

  componentDidMount() {
    this.props.getSupportTicketByid(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    this.setState({ details: this.props.supportCurrentTicket.toJS() });
    if (prevProps.requesting !== this.props.requesting) {
      this.setState({ message: ''});
    }
  }

  handleReplyClick = (e) => this.setState({ showMessageBox: true });
  handleCloseCase = () => this.props.closeSupportTicketById(this.props.match.params.id);
  handleGoBack = () => {
    this.props.clearResponse();
    this.setState({ cancel: true });
  };
  handleReplyMessage = (e) => {
    e.preventDefault();
    if (this.state.message) {
      this.props.replySupportTicketById(this.props.match.params.id, this.state.message);
      this.setState({
        message: '',
        errors: {}
      });
    }
    // else {
    //   this.setState({
    //     errors: {
    //       message: 'Please type some message.'
    //     }
    //   });
    // }
  };
  handleMessageInput = (e, {value}) => this.setState({ message: value });

  render() {
    const { details, cancel } = this.state;
    
    if (cancel) {
      return <Redirect to={`/${this.props.user_type || 'user'}/dashboard/support`} />;
    }
    let message = null;
    const { successResponse, errorResponse, requesting } = this.props;
    if (successResponse && typeof successResponse === 'string') {
      message = <Toaster message={successResponse} timeout={1000} success />;
    }
    if (errorResponse && typeof errorResponse === 'string') {
      message = <Toaster message={errorResponse} timeout={1000} error />;
    }
    return (
      <div className="left container">
        { message && message }
        {/*{ requesting && <Spinner /> }*/}
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
          (
            <div className="grid" key={reply._id}>
              <div className={`${details.email !== reply.added_by ? `` : `right`} floated eight wide column`}>
                <div className={details.email !== reply.added_by ? `callout` : `callout2`}>
                  <p>{reply.reply_message}</p>
                </div>
                <div>
                  {reply.added_by}
                </div>

                  <span className="text-sm text-muted show_mobile_only mg-btm-sm">{reply.added_on}</span>
                </div>
                </div>
          )
        )}
        {(details.status_ticket !== 'closed') && (
          <Form className="form mg-btm-sm" onSubmit={this.handleReplyMessage}>
            <div className="mg-top-sm mg-btm-md">
            <TextArea rows="auto" autoHeight placeholder="type your message" onChange={this.handleMessageInput} value={this.state.message}
            />
            <br/>
            <br/>
              <Button primary floated='right' icon disabled={this.props.requesting} loading={this.props.requesting}>
                <i className="icon icon-paper-plane"/>
              </Button>

            </div>
          </Form>
        )}

      </div>
    );
  }
}

HandleSupport.propTypes = {
  clearResponse: PropTypes.func.isRequired
};
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
