import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
const TabbedView = ({ items, Link, ...props }) =>
  <div className="ui pointing secondary menu" style={styles.tabbedView} {...props}>
    {items &&
      items.map(({ label, to, isVisible = true }) => {
        return (
          <Link
            to={to}
            key={to}
            style={{ display: isVisible ? 'visible' : 'none' }}
            activeClassName="active"
            className="item"
          >
            {label}
          </Link>
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
  Link: PropTypes.func.isRequired
};

export default TabbedView;
