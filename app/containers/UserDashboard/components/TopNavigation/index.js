import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Dropdown, Label } from 'semantic-ui-react';
import avatarImg from 'assets/images/avatar.png';
import Logo from 'assets/Btcwallet_logo/Version 1/Btcwallet_logo-01.png';

const avatar = <Image src={avatarImg} avatar />;
class TopNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {};

  render() {
    return (
      <div className="main-header">
        <div className="main-header__logo">
          <Link to="/admin/dashboard">
            <Image src={Logo} alt="logo" />
          </Link>
        </div>
        <ul className="main-header__menu">
          <li className="nav__item">
            <div className="nav__link">
              {/* <span className="badge__holder">
                <i className="icon-bell" />
                <Label color="red" size="mini" floating circular>
                  22
                </Label>
              </span> */}
            </div>
          </li>
          <li className="nav__item">
            <Dropdown trigger={avatar} className="nav__link" direction="left">
              <Dropdown.Menu className="basic-nav-menu">
                <Link
                  to="/user/dashboard/profile/basic-info"
                  role="option"
                  className="item"
                >
                  <i className="icon user" />
                  <span className="text">Profile</span>
                </Link>
                <div
                  role="option"
                  className="item"
                  onClick={this.props.handleLogout}
                >
                  <i className="icon sign-out" />
                  <span className="text">Log Out</span>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
    );
  }
}

export default TopNavigation;
