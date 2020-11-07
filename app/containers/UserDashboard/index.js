import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { Button, Message, Icon, Sidebar } from 'semantic-ui-react';
import ProfilePic from 'assets/images/noProfile.svg';
import { makeSelectUserConfirmation } from 'containers/Login/selectors';
import SideBar from './components/SideBar';
import { makeSelectLocation, makeSelectUser } from '../App/selectors';
import { logoutRequest } from '../Login/actions';
import {
  resendConfirmationRequest,
} from './actions';
import { DOCUMENT_URL_UPDATE } from '../App/constants';
import Routes from './Routes';
import TopNavigation from './components/TopNavigation';
import './assets/style.scss';
import DashboardMain from './containers/DashboardMain';

import {
  makeSelectError,
  makeSelectResponse,
  makeSelectRequesting,
  makeSelectSuccess,
  makeSelectStatus,
} from './selectors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './sagas';
import { compose } from 'redux';


const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  user: makeSelectUser(),
  userConfirmation: makeSelectUserConfirmation(),
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  isRequesting: makeSelectRequesting(),
  resendEmailSuccess: makeSelectSuccess(),
  responseStatus: makeSelectStatus(),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutRequest()),
  resendConfirmation: () => dispatch(resendConfirmationRequest()),
  navigateToProfilePage: () =>
    dispatch(push('/user/dashboard/profile/basic-info')),
    getCartItemsNumberRequest: () => dispatch(getCartItemsNumberRequest())
});

class UserDashboard extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    resendConfirmation: PropTypes.func.isRequired,
    navigateToProfilePage: PropTypes.func.isRequired,
    user: PropTypes.object,
  };
  state = {
    duration: 'Weekly',
    username: '',
    isConfirmed: false,
    ProfilePic,
    roles: [],
    messageVisible: true,
    showSticky: false,
    sidebar: false,
  };

  componentDidMount() {
    let username;
    const { user } = this.props;
    const userInfo = user && user;
    if (userInfo && userInfo.size !== 0) {
      const email = userInfo.get('email');
      const firstName = userInfo.get('first_name');
      const lastName = userInfo.get('last_name');
      username = `${firstName} ${lastName}`;
      this.setState({
        username,
        isConfirmed: userInfo.get('confirmed'),
        email,
      });
      if (userInfo.get('image_name')) {
        this.setState({
          ProfilePic: `${DOCUMENT_URL_UPDATE}${userInfo.get('image_name')}`,
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      if (this.props.user.get('confirmed')) {
        this.setState({ isConfirmed: true });
      }
      const userInfo = this.props.user;
      const email = userInfo.get('email');
      const firstName = userInfo.get('first_name');
      const lastName = userInfo.get('last_name');
      const username = `${firstName} ${lastName}`;
      if (userInfo.get('image_name')) {
        this.setState({
          ProfilePic: `${DOCUMENT_URL_UPDATE}${userInfo.get('image_name')}`,
        });
      }
      this.setState({
        email,
        username,
        isConfirmed: userInfo.get('confirmed'),
      });
    }
  }

  showSticky = () => {
    this.setState({
      showSticky: !this.state.showSticky,
    });
  };

  resendConfirmation = () => this.props.resendConfirmation();
  handleLogout = () => this.props.logout();
  handleMessageDismiss = () => {
    this.setState({ messageVisible: false });
  };
  handleToggle = (e, se) => {
    if (this.state.duration == 'Monthly') {
      this.setState({ duration: 'Weekly' }, () => {
        this.props.fetchAnalyticsScore();
      });
    } else {
      this.setState({ duration: 'Monthly' }, () => {
        let monthly = true;
        this.props.fetchAnalyticsScore(monthly);
      });
    }
  };
  handleCartSize = size => {
    this.setState({ cartSize: size && size });
  };
  handleToggleSidebar = () => {
    this.setState({ sidebar: !this.state.sidebar });
  };

  render() {
    let url = window.location.href.split('/');
    return (
      <div className="dashboard__main">
        <TopNavigation
            username={this.state.username}
            handleLogout={this.handleLogout}
            showSticky={this.showSticky}
            cartSize={this.state.cartSize}
            handleToggleSidebar={this.handleToggleSidebar}
            profilePic={this.state.ProfilePic}
          />
          <SideBar 
          username={this.state.username}
          email={this.state.email}
          profilePic={this.state.ProfilePic}
          sidebar={this.state.sidebar}
          handleLogout={this.handleLogout}
          showSticky={this.showSticky}
        />
      
		<div className="dashboard__content-user">		
          <div className="content-wrap">
          {((url.length == 5 &&
              url[3] == 'user' &&
               url[4] == 'dashboard') ||
          (url[5] == '' && url.length == 6)) && (
            <div>
            </div>
          )}
          {(location.pathname === '/user/dashboard') && <DashboardMain />}
            <Routes
              location={this.props.location}
              handleCartSize={this.handleCartSize}
            />
          </div>
        </div>
      </div>
    );
  }
}
const withReducer = injectReducer({ key: 'userDashboard', reducer });
const withSaga = injectSaga({ key: 'userDashboard', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserDashboard);
