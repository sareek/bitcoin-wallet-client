import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Menu } from 'semantic-ui-react';

const mainMenu = [
  // {
  //   title: 'News',
  //   path: '/admin/dashboard/news',
  //   icon: 'icon-file-text',
  // },
  // {
  //   title: 'Event',
  //   path: '/admin/dashboard/event',
  //   icon: 'icon-target',
  // },
  // {
  //   title: 'Programs Category',
  //   path: '/admin/dashboard/programs-category',
  //   icon: 'icon-book',
  // },
  // {
  //   title: 'Faculty',
  //   path: '/admin/dashboard/faculty',
  //   icon: 'icon-book',
  // },
  // {
  //   title: 'Programs',
  //   path: '/admin/dashboard/programs',
  //   icon: 'icon-book',
  // },
  // {
  //   title: 'Notice',
  //   path: '/admin/dashboard/notice',
  //   icon: 'icon-file-text',
  // },
  // {
  //   title: 'Image Gallery',
  //   path: '/admin/dashboard/image-gallery',
  //   icon: 'icon-book',
  // },
  // {
  //   title: 'Testimonials',
  //   path: '/admin/dashboard/testimonials',
  //   icon: 'icon-users',
  // },
  // {
  //   title: 'Infrastructure',
  //   path: '/admin/dashboard/infrastructure-template',
  //   icon: 'icon-file',
  // },
  // {
  //   title: 'Certificate',
  //   path: '/admin/dashboard/certificates',
  //   icon: 'icon-user-check',
  // },
  // {
  //   title: 'Content Template',
  //   path: '/admin/dashboard/html-template',
  //   icon: 'icon-file',
  // },
  // {
  //   title: 'Milestones',
  //   path: '/admin/dashboard/milestones',
  //   icon: 'icon-file',
  // },
  // {
  //   title: 'Director\'s Message',
  //   path: '/admin/dashboard/message-from-director',
  //   icon: 'icon-file',
  // },
  // {
  //   title: 'Mission and Vision',
  //   path: '/admin/dashboard/mission-vision',
  //   icon: 'icon-file',
  // },
  // {
  //   title: 'FAQ',
  //   path: '/admin/dashboard/faq',
  //   icon: 'icon-file-text',
  // },
  // {
  //   title: 'Entry Pop-Up',
  //   path: '/admin/dashboard/entry-popup',
  //   icon: 'icon-folder',
  // },
  // {
  //   title: 'Contact Grid',
  //   path: '/admin/dashboard/contact',
  //   icon: 'icon-list',
  // },
  // {
  //   title: 'Download',
  //   path: '/admin/dashboard/download',
  //   icon: 'icon-download',
  // },
  // {
  //   title: 'Website Info',
  //   path: '/admin/dashboard/website-info',
  //   icon: 'icon-info',
  // },
];

class SideNavigation extends React.Component {
  state = { activeIndex: 0, userRole: this.props.userRole };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex, userRole } = this.state;
    return (
      <Accordion as={Menu} vertical className="dashboard__sidenav">
        <Menu.Item>
          <Link className="nav__link" to="/admin/dashboard/">
            <span className="nav__icon">
              <i className="icon home" />
            </span>
            <span className="nav__text">Dashboard</span>
          </Link>
        </Menu.Item>
        {userRole === 'superadmin' &&
          mainMenu.map((main, idx) => {
            if (main.subMenues) {
              return (
                <Menu.Item key={`sub${idx}`}>
                  <Accordion.Title
                    active={activeIndex === idx}
                    index={idx}
                    onClick={this.handleClick}
                  >
                    <span className="nav__link">
                      {main.icon && (
                        <span className="nav__icon">
                          <i className={main.icon} />
                        </span>
                      )}
                      <span className="nav__text">{main.title}</span>
                    </span>
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === idx}>
                    {main.subMenues.map((menu, idx) => (
                      <div key={idx}>
                        <Link className="nav__link" to={menu.path}>
                          <span className="nav__icon">
                            <i className={menu.icon} />
                          </span>
                          <span className="nav__text">{menu.title}</span>
                        </Link>
                      </div>
                    ))}
                  </Accordion.Content>
                </Menu.Item>
              );
            }
            return (
              <Menu.Item key={`main${idx}`}>
                <Link className="nav__link" to={main.path}>
                  {main.icon && (
                    <span className="nav__icon">
                      <i className={main.icon} />
                    </span>
                  )}
                  <span className="nav__text">{main.title}</span>
                </Link>
              </Menu.Item>
            );
          })}
      </Accordion>
    );
  }
}
export default SideNavigation;
