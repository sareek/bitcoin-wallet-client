import React from 'react';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import intersection from 'lodash/intersection';
import jwtDecode from 'jwt-decode';
import { showDialog } from 'containers/App/actions';
// import Login from 'containers/Login';
import { makeSelectUser } from 'containers/App/selectors'
import getToken from 'utils/getToken';

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser()
});

const mapDispatchToProps = dispatch => ({
  showDialog: dialog => dispatch(showDialog(dialog))
});
// allowedRoles.filter(role => user_role.indexOf(role) > 0).length > 0
const Redirection = allowedRoles => WrappedComponent =>
  class Redirection extends React.PureComponent {
    render() {
      const token = getToken();

      try {
        const decoded = jwtDecode(token);
        if (
          typeof decoded === 'object' &&
          decoded.hasOwnProperty('user_id') 
        ) {
          const { role } = decoded;
          const userRole = role || [];
          if (allowedRoles === userRole) {
            return <WrappedComponent {...this.props} />;
          }
        }
      } catch(error) {
        return <Redirect to="/" />;
      }
      return <Redirect to="/" />;
    }
  };

export default props => WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(Redirection(props)(WrappedComponent));
