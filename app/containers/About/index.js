import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './sagas';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import {
  clearState,
} from './actions';

import {

} from './selectors'

const mapStateToProps = createStructuredSelector({
  
});

const mapDispatchToProps = dispatch => ({
  clearState: () => dispatch(clearState()),
});

class AboutPage extends Component {

  render() {
    return (
      <React.Fragment>
       <section className="inner-banner">
        


       </section>
      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({ key: 'aboutPage', reducer });
const withSaga = injectSaga({ key: 'aboutPage', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AboutPage);
