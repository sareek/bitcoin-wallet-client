import React from 'react';
import Routes from './Routes';
import TabbedView from 'components/TabbedView';
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
      <div>
        <TabbedView items={this.state.tabs} />
        <Routes />
      </div>
    );
  }
}

export default Profile;
