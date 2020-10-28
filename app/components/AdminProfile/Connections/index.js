import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Button, Card, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
// import GoogleLogin from 'react-google-login';
// import LinkedIn from 'react-linkedin-login';
// import autobind from 'autobind-decorator'
import { makeSelectUser } from 'containers/App/selectors';
import {
  makeSelectConnections,
  makeSelectSuccessResponse,
  makeSelectErrorResponse,
  makeSelectRequesting,
  makeSelectConnectionStatus,
} from './selectors';
import * as actions from './actions';
import Toaster from 'components/Toaster';
import { GOOGLE_CLIENT_ID, LINKEDIN_CLIENT_ID } from './constants';
import saga from './sagas'
import reducer from './reducers'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from "redux";

const mapDispatchToProps = (dispatch) => ({
  getConnectionsRequest: () => dispatch(actions.getConnectionStatusRequest()),
  linkFacebookRequest: (token) => dispatch(actions.linkFacebookRequest(token)),
  unlinkFacebookRequest: () => dispatch(actions.unlinkFacebookRequest()),
  linkGoogleRequest: (token) => dispatch(actions.linkGoogleRequest(token)),
  unlinkGoogleRequest: () => dispatch(actions.unlinkGoogleRequest()),
  linkLinkedinRequest: (token, redirect_uri) => dispatch(actions.linkLinkedinRequest(token, redirect_uri)),
  unlinkLinkedinRequest: () => dispatch(actions.unlinkLinkedinRequest()),
  linkTwitterRequest: (token) => dispatch(actions.linkTwitterRequest(token)),
  unlinkTwitterRequest: () => dispatch(actions.unlinkTwitterRequest()),
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  makeSelectConnections: makeSelectConnections(),
  connectionStatus: makeSelectConnectionStatus(),
  successResponse: makeSelectSuccessResponse(),
  errorResponse: makeSelectErrorResponse(),
  isRequesting: makeSelectRequesting(),
});

class Connections extends React.Component {
  static propTypes = {
    getConnectionsRequest: PropTypes.func.isRequired,
    linkFacebookRequest: PropTypes.func.isRequired,
    unlinkFacebookRequest: PropTypes.func.isRequired,
    linkGoogleRequest: PropTypes.func.isRequired,
    unlinkGoogleRequest: PropTypes.func.isRequired,
    linkLinkedinRequest: PropTypes.func.isRequired,
    unlinkLinkedinRequest: PropTypes.func.isRequired,
    linkTwitterRequest: PropTypes.func.isRequired,
    unlinkTwitterRequest: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getConnectionsRequest();
  }

  connectFacebook = () => {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        this.props.linkFacebookRequest(response.authResponse.accessToken);
      } else {
        FB.login(
          (response) => {
            if (response.authSuccess) {
              this.props.linkFacebookRequest(response.authSuccess.accessToken);
            } else if (response.authResponse) {
              this.props.linkFacebookRequest(response.authResponse.accessToken);
            }
          },
          { scope: 'email,public_profile', info_fields: 'email,name' }
        );
      }
    });
  };

  disconnectFacebook = () => {
    this.props.unlinkFacebookRequest();
  };
  connectTwitter = () => {
    this.props.linkTwitterRequest();
  };
  disconnectTwitter = () => {
    this.props.unlinkTwitterRequest();
  };

  // @autobind
  connectLinkedin = ({ code, redirectUri }) => {
    this.props.linkLinkedinRequest(code, redirectUri);
  };
  disconnectLinkedin = () => {
    this.props.unlinkLinkedinRequest();
  };
  connectGoogle = (response) => {
    this.props.linkGoogleRequest(response.tokenObj.access_token);
  };
  connectGoogleError = (response) => {
    // this.props.linkGoogleRequest(response.tokenObj.access_token);
  };
  disconnectGoogle = () => {
    this.props.unlinkGoogleRequest();
  };

  render() {
    const { successResponse, errorResponse, connectionStatus } = this.props;
    const connection_status = connectionStatus.toJS();
    let message;
    if (successResponse && typeof successResponse === 'string') {
      message = <Toaster message={successResponse} timeout={1000} success />;
    }
    if (errorResponse && typeof errorResponse === 'string') {
      message = <Toaster message={errorResponse} timeout={1000} error />;
    }
    return (
      <div className="segment">
        {message && message}
        <p>Connect with Social media</p>
        <Card.Group className="stackable">
          <Card>
            <Card.Content>
              <Image size="mini" src="" alt="Facebook"  />
              <Card.Header>Facebook</Card.Header>
            </Card.Content>
            <Card.Content extra>
              {connection_status.status_facebook
                ? <Button
                  name="facebook"
                  onClick={this.disconnectFacebook}
                  className="ui button"
                >
                  Disconnect
                  </Button>
                : <div>
                  <Button
                    name="facebook"
                    onClick={this.connectFacebook}
                    primary
                  >
                    Connect
                    </Button>
                </div>}
            </Card.Content>
          </Card>
          {/* <Card>
            <Card.Content>
              <Image size="mini" src={google_logo} />
              <Card.Header>Google</Card.Header>
            </Card.Content>
            <Card.Content extra>
              {connection_status.status_google
                ? <Button
                  name="google"
                  onClick={this.disconnectGoogle}
                  className="ui button"
                >
                  Disconnect
                  </Button>
                : <GoogleLogin
                  className="button primary"
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Connect"
                  scope="https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me email profile"
                  onSuccess={this.connectGoogle}
                  onFailure={this.connectGoogleError}
                />}
            </Card.Content>
          </Card> */}
          {/* <Card>
            <Card.Content>
              <Image floated="right" size="mini" src={twitter_logo} />
              <Card.Header>Twitter</Card.Header>
            </Card.Content>
            <Card.Content extra>
              {connection_status.status_twitter ?
                <Button name="twitter" onClick={this.disconnectTwitter} className="ui button">
                  Disconnect
                </Button>
                : <Button name="twitter" onClick={this.connectTwitter} primary>
                  Connect
                </Button>}
            </Card.Content>
          </Card> */}
          {/* <Card>
            <Card.Content>
              <Image size="mini" src={linkedin_logo} />
              <Card.Header>Linkedin</Card.Header>
            </Card.Content>
            <Card.Content extra>
              {connection_status.status_linkedin
                ? <Button
                  name="linkedin"
                  onClick={this.disconnectLinkedin}
                  className="ui button"
                >
                  Disconnect
                  </Button>
                :
                <LinkedIn
                  clientId={`${LINKEDIN_CLIENT_ID}`}
                  callback={this.connectLinkedin}
                  className="ui primary button"
                  text="CONNECT"
                  scope={['r_basicprofile', 'r_emailaddress']}
                />
              }
            </Card.Content>
          </Card> */}
        </Card.Group>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'adminProfileConnections', reducer });
const withSaga = injectSaga({ key: 'adminProfileConnections', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Connections);
