import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './sagas';
import { compose } from 'redux';
import {
  makeSelectLoading,
  makeSelectError
} from './selectors';
import { Grid, Segment } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import {

} from './actions'

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const mapDispatchToProps = dispatch => ({
});

class DashboardMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
  }

  componentDidUpdate(prevProps) {

  }

  render() {
    const { } = this.state;
    const { } = this.props;
    return (
      <div>
        <Grid divided='vertically'>
          <Grid.Row >
            <Grid.Column width={11}>
              <div className="main-heading">
                <p className="title">  <i className="icon tv"></i> Dashboard <span className="text-muted">Crypto</span> </p>

              </div>

              <Segment className="main-statistics">
                <div>
                  <p className="title">price</p>
                  <p className="value">$15,508.64</p>
                </div>
                <div>
                  <p className="title">
                    24 HOUR % CHANGE</p>
                  <p className="value text-green" ><i className="icon angle up"></i>3.49%</p>
                </div>
                <div>
                  <p className="title">MARKET CAP</p>
                  <p className="value">$287.95B</p>
                </div>
                <div>
                  <p className="title">VOLUME (24H)</p>
                  <p className="value">$39.44B</p>
                </div>
              </Segment>
            </Grid.Column>
            <Grid.Column width={5}>
              <Segment className="announcements">
                <div className="sm-heading"><p className="title"><span><i className="icon bullhorn"></i></span> Announcements </p></div>

                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'dashboardMain', reducer });
const withSaga = injectSaga({ key: 'dashboardMain', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DashboardMain);
