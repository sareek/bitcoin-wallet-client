import React from 'react';
import { } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from  '../../assets/Btcwallet_logo/Version 1/Btcwallet_logo-01.png'

class Header extends React.PureComponent {
  render() {

    return (
      <header id="header" className="home">
      

        <div className="ui secondary  menu">
          <Link className="brand">
            <img src={Logo}/>
           </Link>
          <div className="right menu">
            <Link className="active item">
              About
             </Link>

            <Link className="item">
              Exchange
            </Link>
            <Link className="item">
              Btc Price
            </Link>
            
            <Link className="ui item" to='/login'>Login</Link>
          </div>
        </div>
      </header>

    );
  }
}
const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps)(Header);
