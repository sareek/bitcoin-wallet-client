/**
 *
 * Unsubscribe
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { unsubscribeRequest } from './actions';
import {
  makeSelectRequesting,
  makeSelectError,
  makeSelectResponse,
  makeSelectSuccess,
} from './selectors';
import { Button } from 'semantic-ui-react';

/* eslint-disable react/prefer-stateless-function */
export class Unsubscribe extends React.Component {
  state = {
    successResponse: '',
    errorResponse: '',
    showButton: true,
  };

  componentDidMount() {
    const unsubscribe_token = this.props.match.params.token
      ? this.props.match.params.token
      : '';
    this.setState({ token: unsubscribe_token });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.successResponse &&
      nextProps.successResponse !== this.props.successResponse
    ) {
      this.setState({
        successResponse: nextProps.successResponse,
        showButton: false,
      });
    }

    if (
      nextProps.errorResponse &&
      nextProps.errorResponse !== this.props.errorResponse
    ) {
      this.setState({
        errorResponse: nextProps.errorResponse,
        showButton: false,
      });
    }
  }

  handleUnsubscribe = e => {
    e.preventDefault();
    const { token } = this.state;
    if (token) {
      this.props.unsubscribeUser(token);
    }
  };

  render() {
    const { successResponse, errorResponse, showButton } = this.state;
    return (
      <div>
        <Helmet>
          <title>Unsubscribe</title>
          <meta name="description" content="Unsubscribe" />
        </Helmet>
        {successResponse !== '' && successResponse}
        {errorResponse !== '' && errorResponse}

        {showButton && (
          <>
            <h3>
              It's sad to see you go. You'll be missing out on our newsletter.
            </h3>
            <Button onClick={this.handleUnsubscribe}>Unsubscribe</Button>
          </>
        )}
      </div>
    );
  }
}

Unsubscribe.propTypes = {
  successResponse: PropTypes.string.isRequired,
  errorResponse: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  requesting: makeSelectRequesting(),
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
});

const mapDispatchToProps = dispatch => ({
  unsubscribeUser: token => dispatch(unsubscribeRequest(token)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'unsubscribe', reducer });
const withSaga = injectSaga({ key: 'unsubscribe', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Unsubscribe);
