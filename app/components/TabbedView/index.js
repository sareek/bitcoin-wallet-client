import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import { NavLink } from 'react-router-dom';
const TabbedView = ({ items, Link, ...props }) =>
  <div className="ui pointing secondary menu" style={styles.tabbedView} {...props}>
    {items &&
      items.map(({ label, to, isVisible = true }) => {
        return (
          <NavLink
            to={to}
            key={to}
            style={{ display: isVisible ? 'visible' : 'none' }}
            activeClassName="active"
            className="item"
          >
            {label}
          </NavLink>
        );
      })}
  </div>;

TabbedView.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
};

export default TabbedView;
