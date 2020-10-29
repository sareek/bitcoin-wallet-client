import React from 'react';
import { Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLocation } from 'containers/App/selectors';
import BasicInfo from '../BasicInfo/Loadable';
import Password from '../Password/Loadable';
// import Mobile from '../Mobile/Loadable';
import MultiFactorAuth from '../MultiFactorAuth/Loadable';
import BankAccount from '../BankAccount/Loadable';
import Connections from '../Connections/Loadable';
import Documents from '../Documents/Loadable';

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation()
});

function ProfileRoutes({ location }) {
  return (
    <Switch location={location}>
      <Route exact path="/*/dashboard/profile" render={props => <BasicInfo {...props} />} />
      <Route path="/*/dashboard/profile/basic-info" render={props => <BasicInfo {...props} />} />
      <Route path="/*/dashboard/profile/connections" render={props => <Connections {...props} />} />
      <Route path="/*/dashboard/profile/password" render={props => <Password {...props} />} />
      <Route path="/*/dashboard/profile/documents" render={props => <Documents {...props} />} />
      <Route path="/*/dashboard/profile/multi-factor-auth" render={props => <MultiFactorAuth {...props} />} />
      <Route path="/*/dashboard/profile/bank-account" render={props => <BankAccount {...props} />} />
    </Switch>
  );
}

export default connect(mapStateToProps)(ProfileRoutes);
