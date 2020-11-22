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

import Img from '../../assets/images/static/banner.jpg'
import Logo3 from '../../assets/Btcwallet_logo/Version 3/Btcwallet_logo_3-01.png' 

import {

} from './actions';

import {

} from './selectors'


const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = dispatch => ({

});

class HomePage extends Component {

  state = {

  }

  render() {
    const { } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>Wallet Homepage</title>
          <meta name="description" content="Wallet" />
        </Helmet>

        {/* banner section */}
        <div className="banner">
       
          <div className="bg-img">
            <img src={Img} alt="bitcoin tech background image" />
          </div>
          <div className="container ui two column stackable grid content">
            <div className="column">
              <h1>What is Wallet?</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec viverra leo, fringilla ullamcorper dolor. Suspendisse potenti. Pellentesque aliquet nisi et tristique dapibus. Etiam ultrices consectetur felis, sed tincidunt turpis laoreet quis. Nulla non dui sed dolor commodo ultrices nec sit amet lectus. </p>
            </div>
            <div className="column text-center">
              <Link className="ui button huge orange get-started" >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* about secion */}

        <div className="about">
          <div className="container ui two column stackable grid ">
            <div className="column">
            <img src={Logo3} alt="btc wallet version 3" />
              <p>Btc wallet helps you buy Bitcoin, Etherium, XRP, Litecoin in easy steps</p>
            </div>
            <div className="column">
              <form className="ui form sign-up">
                <div className="field">
                 
                  <input type="text" name="user-name" placeholder="User Name" />
                </div>
                <div className="field">
                 
                 <input type="email" name="email" placeholder="Email" />
               </div>
               <div className="field">
                 
                 <input type="password" name="password" placeholder="Password" />
               </div>

               <div className="field">
                <button className="ui button orange" type="submit">Sign Up</button>
               </div>
              </form>
            </div>
          </div>
        </div>


        {/* why-section */}

        <div className="about">
          <div className="ui container">
            <div>
              <h3 className="section-header">Why are people from all over the world choosing Bitcoin</h3>
            </div>

            <div className="ui three column stackable grid ">
              <div className="column">
                <div>
                  <figure>
                    images here
                </figure>
                  <figcaption>1M-Trusted Customers</figcaption>
                </div>

              </div>
              <div className="column">
                <div>
                  <figure>
                    images here
                </figure>
                  <figcaption>1M-Trusted Customers</figcaption>
                </div>

              </div>
              <div className="column">
                <div>
                  <figure>
                    images here
                </figure>
                  <figcaption>1M-Trusted Customers</figcaption>
                </div>

              </div>
            </div>
          </div>
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
