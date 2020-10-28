import React, { Suspense, lazy } from 'react';
import Switch from 'react-router-dom/Switch';
import Loader from 'react-loader-spinner';

import Route from 'react-router-dom/Route';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
const Login = lazy(() => import('containers/Login'));
const Register = lazy(() => import('containers/Register'));
const AdminDashboard = lazy(() => import('containers/AdminDashboard/Loadable'));
const UserDashboard = lazy(() => import('containers/UserDashboard/Loadable'));

// import Login from 'containers/Login';
import NotFoundPage from 'containers/NotFoundPage';
// import AdminDashboard from 'containers/AdminDashboard/Loadable';
import AdminDashboardLayout from 'containers/AdminDashboard/containers/AdminLayout';
import UserDashboardLayout from 'containers/UserDashboard/containers/UserLayout';
import { makeSelectLocation } from './selectors';
import PasswordReset from '../Login/password-reset';

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

class Routes extends React.PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
      hash: PropTypes.string,
      key: PropTypes.string,
    }).isRequired,
  };

  render() {
    return (
      <Suspense
        fallback={
          <Loader type="RevolvingDot" color="#00BFFF" height={0} width={0} />
        }
      >
        <Switch location={this.props.location}>
          <Route exact path="/" render={props => <Login {...props} />} />
          <Route exact path="/register" render={props => <Register {...props} />} />

          <Route
            exact
            path="/password-reset/user/:userid"
            render={props => <PasswordReset {...props} />}
          />

          <Route
            path="/admin/dashboard"
            render={props => (
              <AdminDashboardLayout>
                <AdminDashboard {...props} />
              </AdminDashboardLayout>
            )}
          />

          <Route
            path="/user/dashboard"
            render={props => (
              <UserDashboardLayout>
                <UserDashboard {...props} />
              </UserDashboardLayout>
            )}
          />

          <Route
            render={props => (
              <AdminDashboardLayout>
                <NotFoundPage />
              </AdminDashboardLayout>
            )}
          />
        </Switch>
      </Suspense>
    );
  }
}

export default connect(mapStateToProps)(Routes);
