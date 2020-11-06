import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLocation } from 'containers/App/selectors';
import WalletsList from '../WalletsList/Loadable';
import WatchOnly from '../WatchOnly/Loadable';

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation()
});

function ProfileRoutes({ location }) {
  return (
    <Switch location={location}>
      <Route exact path="/*/dashboard/wallet-address" render={props => <WalletsList {...props} />} />
      <Route path="/*/dashboard/wallet-address/list" render={props => <WalletsList {...props} />} />
      <Route path="/*/dashboard/wallet-address/watchonly" render={props => <WatchOnly {...props} />} />
    </Switch>
  );
}

export default connect(mapStateToProps)(ProfileRoutes);
