import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLocation } from 'containers/App/selectors';
import Password from '../Password/Loadable';
import MultiFactorAuth from '../MultiFactorAuth/Loadable';

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation()
});

function ProfileRoutes({ location }) {
  return (
    <Switch location={location}>
      <Route path="/*/dashboard/settings/password" render={props => <Password {...props} />} />
      <Route path="/*/dashboard/settings/multi-factor-auth" render={props => <MultiFactorAuth {...props} />} />
    </Switch>
  );
}

export default connect(mapStateToProps)(ProfileRoutes);
