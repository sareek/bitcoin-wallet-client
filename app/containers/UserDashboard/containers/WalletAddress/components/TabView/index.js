import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const TabbedView = () => (
  <>
  <NavLink
    to={'user/dashboard/wallet-address/list'}
    key={'1'}
    activeClassName="active"
    className="ui button item orange"
  >
    Wallet Addresses
  </NavLink>
  <NavLink
    to={'user/dashboard/wallet-address/watchonly'}
    key={'2'}
    activeClassName="active"
    className="ui button item eye-button"
  >
    <Icon className="eye" />
  </NavLink>
  </>
)


TabbedView.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
};

export default TabbedView;
