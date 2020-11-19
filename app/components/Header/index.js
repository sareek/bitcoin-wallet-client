import React from 'react';
import { } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

class Header extends React.PureComponent {
  render() {

    return (
      <header id="header">
         HEADERRRRRRRRRRRRR
         <Link to='/login'>Login</Link>
      </header>
    );
  }
}
const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps)(Header);
