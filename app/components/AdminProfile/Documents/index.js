import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  loadMyProfile
} from './actions';
import {
  makeSelectRequesting,
  makeSelectSuccess,
  makeSelectError,
  makeSelectResponse,
  makeSelectMyProfile,
  makeSelectSubmittedDocuments,
  makeSelectApprovedDocuments
} from './selectors';
import { makeSelectUserId } from "containers/App/selectors";
import Toaster from "components/Toaster";
import Documents from './Documents';
import saga from './sagas'
import reducer from './reducer'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from "redux";

const mapStateToProps = createStructuredSelector({
  myProfile: makeSelectMyProfile(),
  errorResponse: makeSelectError(),
  requesting: makeSelectRequesting(),
  success: makeSelectSuccess(),
  successResponse: makeSelectResponse(),
  userId: makeSelectUserId(),
  submittedDocuments: makeSelectSubmittedDocuments(),
  approvedDocuments: makeSelectApprovedDocuments(),
});

const mapDispatchToProps = dispatch => ({
  loadMyProfile: userId => dispatch(loadMyProfile(userId)),
});

class Password extends React.Component {
  state = {
    errors: {}
  };

  static propTypes = {
    loadMyProfile: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.loadMyProfile(this.props.userId);
  }

  render() {
    const {
    } = this.state;
    const {
      successResponse, errorResponse, requesting,
      submittedDocuments, approvedDocuments
    } = this.props;
    let message;
    if (successResponse && typeof successResponse === "string") {
      message = <Toaster message={successResponse} timeout={1000} success />;
    }
    if (errorResponse && typeof errorResponse === "string") {
      message = <Toaster message={errorResponse} timeout={1000} error />;
    }
    return (
      <div className="">
        { message && message }
        <div className="two column stackable grid">
          <div className="column">
            <div className="segment">
            <h3>Submitted Documents</h3>
            <Documents documents={submittedDocuments} />
            </div>
          </div>
          <div className="column">
            <div className="segment">
              <h3>Approved Documents</h3>
              <Documents documents={approvedDocuments} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'adminProfileDocuments', reducer });
const withSaga = injectSaga({ key: 'adminProfileDocuments', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Password);
