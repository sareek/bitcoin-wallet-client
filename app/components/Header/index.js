import React from 'react';
import { Icon, Button} from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from  '../../assets/Btcwallet_logo/Version 1/Btcwallet_logo-01.png'

class Header extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      sticky: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 0) {
        this.setState({ sticky: true })
    } else {
        this.setState({ sticky: false })
    }
}

  handleToggle = () => {
    const { show } = this.state;
     this.setState({
      show: show ? false : true 
     })
  }

  render() {
    const { show, sticky } = this.state;
    return (
      <header id="header" className={sticky ? "home bg-black" : "home"}>
        <div className="ui secondary  menu">
          <Link to={'/'} className="brand">
            <img src={Logo}/>
           </Link>
          <div className="right menu main-menu">
            <Link to={'/about'} className="active item">
              About
             </Link>

            <Link to={'/'} className="item">
              Exchange
            </Link>
            <Link to={'/'} className="item">
              Btc Price
            </Link>
            
            <Link className="ui button orange item login" to='/login'>Sign In</Link>
          </div>
          <div className="right menu mobile-view">
            <div>
              <Button 
                onClick={this.handleToggle}
                className="hamburger-menu"
              >
                   <Icon name="bars" />
              </Button>
            </div>
            <div className={show ? "mobile-navigation show" : "mobile-navigation "}>
              <Link to={'/about'} className="active item">
                About
              </Link>

              <Link to={'/'} className="item">
                Exchange
              </Link>
              <Link to={'/'} className="item">
                Btc Price
              </Link>
              
              <Link className="ui button orange item login" to='/login'>Sign In</Link>
            </div>
          </div>
        </div>
      </header>

    );
  }
}
const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps)(Header);
