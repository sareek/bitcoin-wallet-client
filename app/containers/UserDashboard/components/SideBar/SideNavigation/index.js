import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Menu } from 'semantic-ui-react';

const mainMenu = [
  {
    title: 'Dashboard',
    path: '/user/dashboard',
    icon: 'icon home',
  },
  //   {
  //   title: 'Product',
  //   path: '/',
  //   icon: 'icon-package',
  //   subMenues: [
  //     {
  //       title: 'My Product',
  //       path: '/user/dashboard/my-products',
  //       group_title: 'my-product',
  //       icon: "icon-grid",
  //     },
  //     {
  //       title: 'Available Products',
  //       path: '/user/dashboard/product',
  //       group_title: 'available-product',
  //       icon: "icon-shopping-cart",
  //     },
  //   ],
  // },
  // {
  //   title: 'Get Consultant',
  //   path: '/user/dashboard/consultants',
  //   icon: "icon-file",
  // },
  {
    title: 'Bitcoin Wallet',
    path: '/user/dashboard/wallet',
    icon: 'icon bitcoin',
  },
];

class SideNavigation extends React.Component {
  constructor(props) {
    super(props);
    // this.componentRef = React.createRef(null);
  }

  state = { activeIndex: 0, submenu_content: 0, setActive: '', subTitle: '' };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex, setActive: '' });
  };

  componentRef = React.createRef(null);

  handleWheel = e => {
    e.stopPropagation();
  };

  componentDidMount() {
    if (this.componentRef.current) {
      this.componentRef.current.addEventListener('wheel', this.handleWheel);
    }
  }

  componentWillUnmount() {
    if (this.componentRef.current) {
      this.componentRef.current.removeEventListener('wheel', this.handleWheel);
    }
  }

  contentClick = (idx, sub_title) => {
    this.setState({ submenu_content: idx, setActive: '', subTitle: sub_title });
  };

  handleClickActive = title => {
    this.setState({ setActive: title, subTitle: '' });
  };

  render() {
    const { activeIndex, submenu_content } = this.state;
    return (
      <div className="sidebar-nav">
        <Accordion
          style={{ touchAction: 'none' }}
          as={Menu}
          vertical
          className="dashboard__sidenav"
        >
          {mainMenu &&
            mainMenu.length > 0 &&
            mainMenu.map((main, idx) => {
              if (main.subMenues) {
                return (
                  <Menu.Item key={`sub${idx}`}>
                    {main.subMenues.length > 0 && (
                      <div>
                        <Accordion.Title
                          className="dropdown"
                          active={activeIndex === idx}
                          index={idx}
                          onClick={this.handleClick}
                        >
                          <span className="nav__link">
                            <span className="nav__icon">
                              <i className={main.icon} />
                              &nbsp;
                            </span>
                            <span className="nav__text">{main.title}</span>
                          </span>
                          <span className="arrow-wrap">
                            <i className="icon-chevron-right"></i>
                          </span>
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === idx}>
                          {main.subMenues.map((menu, idx) => (
                            <div
                              className={
                                this.state.subTitle == menu.title
                                  ? 'active'
                                  : ''
                              }
                              onClick={() => this.contentClick(idx, menu.title)}
                              key={idx}
                            >
                              <Link className="nav__link" to={menu.path}>
                                <span className="nav__icon">
                                  <i className={menu.icon} />
                                  &nbsp;
                                </span>
                                <span className="nav__text">{menu.title}</span>
                              </Link>
                            </div>
                          ))}
                        </Accordion.Content>
                      </div>
                    )}
                  </Menu.Item>
                );
              }
              return (
                <div
                  onClick={() => this.handleClickActive(main.title)}
                  className={this.state.setActive == main.title ? 'active' : ''}
                  key={`main${idx}`}
                >
                  <Menu.Item>
                    <Link className="nav__link" to={main.path}>
                      <span className="nav__icon">
                        <i className={main.icon} />
                        &nbsp;
                      </span>
                      <span className="nav__text">{main.title}</span>
                    </Link>
                  </Menu.Item>
                </div>
              );
            })}
        </Accordion>
      </div>
    );
  }
}
export default SideNavigation;
