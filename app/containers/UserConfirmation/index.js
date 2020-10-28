/**
 *
 * UserConfirmation
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
import {makeSelectError,makeSelectRequesting,makeSelectResponse,makeSelectSuccess} from './selectors';
import {loadUserConfirmationRequest} from './actions'
import reducer from './reducer';
import saga from './saga';
import {Link} from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
export class UserConfirmation extends React.Component {
  componentWillMount(){
    const id = this.props.match.params.id ? this.props.match.params.id : null;
    this.props.userConfirmationRequest(id);
  }
  render() {
    const {successResponse,errorResponse,isRequesting} = this.props
    return (
      <div>
        {/* <Helmet>
          <title>UserConfirmation</title>
          <meta name="description" content="Description of UserConfirmation" />
        </Helmet> */}
        <div className="jumbotron text-xs-center">
  {successResponse && <h1>Thank You!</h1>}
  {errorResponse && <h1>Oops!!</h1>}
  <p className="lead"><strong>{successResponse ? successResponse : errorResponse}</strong></p>
  <hr />
  <p className="lead">
    <Link className="btn btn-primary btn-sm" to="/login" role="button">Continue to Login</Link>
  </p>
</div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isSuccess: makeSelectSuccess(),
  isRequesting: makeSelectRequesting(),
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
});

const mapDispatchToProps=(dispatch)=> ({
  userConfirmationRequest:(id)=>dispatch(loadUserConfirmationRequest(id))
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userConfirmation', reducer });
const withSaga = injectSaga({ key: 'userConfirmation', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserConfirmation);
