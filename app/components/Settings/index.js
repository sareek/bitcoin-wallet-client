import React from 'react';
import styles from './styles.css';
import Routes from './Routes';
import TabbedView from '../TabbedView';
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
