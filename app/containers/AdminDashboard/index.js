import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import jwtDecode from 'jwt-decode';
import { Button } from 'semantic-ui-react';
import { DOCUMENT_URL_UPDATE } from 'containers/App/constants';
import ProfilePic from 'assets/images/avatar.png';
import AdminNotification from 'containers/Globals/AdminNotifications/Loadable';
import { makeSelectUser, makeSelectLocation } from '../App/selectors';
import { logoutRequest } from '../Login/actions';
import TopNavigation from './components/TopNavigation';
import SideBar from './components/SideBar';
import Routes from './Routes';

import GoogleAnalyticsReport from './containers/GoogleAnalytics/AnalyticsReport';

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  user: makeSelectUser(),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutRequest()),
  navigateToProfilePage: () => dispatch(push('/admin/dashboard/profile')),
});

class AdminDashboard extends React.Component {
  state = {
    username: '',
    menuVisible: false,
    ProfilePic,
    moduleList: [],
  };

  // componentWillMount() {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token);
  //       this.setState({
  //         userRole: decoded.user.role,
  //       });
  //       if (decoded.user.user_role[0] !== 'superadmin') {
  //         const allowed_actions = localStorage.getItem('allowed_actions');
  //         const module_list = [];
  //         if (allowed_actions) {
  //           try {
  //             const decoded = jwtDecode(allowed_actions);
  //             decoded.allowed_actions.map(group_list =>
  //               module_list.push(group_list.group_title),
  //             );
  //           } catch (error) {
  //             localStorage.clear();
  //           }
  //           this.setState({
  //             moduleList: module_list,
  //           });
  //         }
  //         const action_list = [];
  //         if (allowed_actions) {
  //           try {
  //             const decoded = jwtDecode(allowed_actions);
  //             decoded.allowed_actions.map(group_list =>
  //               group_list.allowed_actions.map(action_group =>
  //                 action_list.push(action_group.action_title),
  //               ),
  //             );
  //           } catch (error) {
  //             localStorage.clear();
  //             sessionStorage.removeItem('token');
  //           }
  //           this.setState({
  //             actionList: action_list,
  //           });
  //         }
  //       }
  //     } catch (error) {
  //       localStorage.clear();
  //       sessionStorage.removeItem('token');
  //     }
  //   }
  // }

  componentDidMount() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          this.setState({
            userRole: decoded.user.role,
          });
          if (decoded.user.user_role[0] !== 'superadmin') {
            const allowed_actions = localStorage.getItem('allowed_actions');
            const module_list = [];
            if (allowed_actions) {
              try {
                const decoded = jwtDecode(allowed_actions);
                decoded.allowed_actions.map(group_list =>
                  module_list.push(group_list.group_title),
                );
              } catch (error) {
                localStorage.clear();
              }
              this.setState({
                moduleList: module_list,
              });
            }
            const action_list = [];
            if (allowed_actions) {
              try {
                const decoded = jwtDecode(allowed_actions);
                decoded.allowed_actions.map(group_list =>
                  group_list.allowed_actions.map(action_group =>
                    action_list.push(action_group.action_title),
                  ),
                );
              } catch (error) {
                localStorage.clear();
                sessionStorage.removeItem('token');
              }
              this.setState({
                actionList: action_list,
              });
            }
          }
        } catch (error) {
          localStorage.clear();
          sessionStorage.removeItem('token');
        }
      }


    let username;
    const { user } = this.props;
    const userInfo = user && user;
    if (userInfo && userInfo.size > 0) {
      const department_name = userInfo.get('username');
      const email = userInfo.get('email');
      // const last_name = userInfo.get('last_name');
      username = department_name;
      this.setState({ username, email });
      if (userInfo.get('image_name')) {
        this.setState({
          ProfilePic: `${DOCUMENT_URL_UPDATE}${userInfo
            .get('image_name')
            .get('document_name')}`,
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      const userInfo = this.props.user;
      const department_name = userInfo.get('department_name');
      const last_name = userInfo.get('last_name');
      const username = department_name;
      const email = userInfo.get('email');
      if (userInfo.get('image_name')) {
        this.setState({
          ProfilePic: `${DOCUMENT_URL_UPDATE}${userInfo
            .get('image_name')
            .get('document_name')}`,
        });
      }
      this.setState({ username, email });
    }
  }

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { pathname } = this.props.location;
    return (
      <div className="dashboard__main">
        <TopNavigation
          handleLogout={this.handleLogout}
          ProfilePic={this.state.ProfilePic}
        />
        <SideBar
          username={this.state.username}
          email={this.state.email}
          ProfilePic={this.state.ProfilePic}
          userRole={this.state.userRole}
        />
        <div className="dashboard__content">
          {(pathname === '/admin/dashboard' ||
            pathname === '/admin/dashboard/') && <GoogleAnalyticsReport />}
          <Routes location={this.props.location} />
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AdminDashboard),
);
