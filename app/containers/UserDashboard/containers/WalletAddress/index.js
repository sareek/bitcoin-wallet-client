import React from 'react';
import Routes from './Routes';
import TabbedView from './components/TabView';
import PropTypes from 'prop-types';

class Profile extends React.Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired
  };
  state = {
    tabs: this.props.tabs ? this.props.tabs : []
  };
  render() {
    return (
      <div className="wallet-n-address__tabs">
        <TabbedView items={this.state.tabs} />
        <Routes />
      </div>
    );
  }
}

export default Profile;
