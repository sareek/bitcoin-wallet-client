import React, { Suspense, lazy } from 'react';
import {Route, Switch} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLocation } from 'containers/App/selectors';

import Profile from 'components/AdminProfile';


function AdminRoutes({ location }) {
  return (
    <Suspense
      fallback={
        <Loader type="RevolvingDot" color="#00BFFF" height={0} width={0} />
      }
    >
      <Switch location={location}>
        <Route
          path="/admin/dashboard/profile"
          render={props => (
            <Profile
              tabs={[
                {
                  to: '/admin/dashboard/profile/basic-info',
                  label: 'KYC',
                  action_title: 'profile_basic_info',
                },
                {
                  to: '/admin/dashboard/profile/password',
                  label: 'Password',
                  action_title: 'profile_password',
                },
                {
                  to: '/admin/dashboard/profile/multi-factor-auth',
                  label: 'Two Factor Auth',
                  action_title: 'profile_two_factor_auth',
                },
              ]}
              {...props}
            />
          )}
        />
       
      </Switch>
    </Suspense>
  );
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

export default connect(mapStateToProps, {})(AdminRoutes);
