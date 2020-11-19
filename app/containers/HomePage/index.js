import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './sagas';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {

} from './actions';

import {

} from './selectors'


const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = dispatch => ({

});

class HomePage extends Component {

  state ={
    
  }

  render() {
    const { } = this.state;
    return (
      <React.Fragment>
          <Helmet>
            <title>Wallet Homepage</title>
            <meta name="description" content="Wallet" />
          </Helmet>
          <div>
            <h1>Bodyyyyy</h1>
          </div>
      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({ key: 'homepage', reducer });
const withSaga = injectSaga({ key: 'homepage', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
