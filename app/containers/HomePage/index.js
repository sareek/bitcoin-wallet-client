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
import MillionIcon from '../../assets/images/icons_why/svg/003-customer-review.svg';
import WalletIcon from  '../../assets/images/icons_why/svg/002-purse.svg';
import EarthIcon from '../../assets/images/icons_why/svg/003-earth.svg';


import EarthIcon2 from '../../assets/images/icons_why/mycollection/002-globe.png';
import TrustIcon from '../../assets/images/icons_why/mycollection/003-honesty.png';
import VerifiedIcon from  '../../assets/images/icons_why/mycollection/001-verified.png';

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
        <section className="banner">
       
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
        </section>

        {/* about secion */}

        <section className="about">
          <div className="container ui two column stackable grid ">
            <div className="column">
            <img src={Logo3} alt="btc wallet version 3" />
              <h3 className="section-header">Btc wallet helps you buy Bitcoin, Etherium, XRP, <br/>Litecoin in easy steps</h3>
            </div>
            <div className="column">
              <form className="ui form sign-up">
                <p>Sign Up</p>
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
        </section>


        {/* why-section */}

        <section className="why">
          <div className="ui container">
            <div>
              <h3 className="section-header">Why are people from all over the world choosing Bitcoin?</h3>
            </div>

            <div className="ui three column stackable grid ">
              <div className="column">
                <div className="card">
                  <figure>
                    <img src={MillionIcon} alt="customer satisdaction icon" />
                </figure>
                  <figcaption>1M-Trusted Customers</figcaption>
                </div>

              </div>
              <div className="column">
                <div>
                  <figure>
                  <img src={WalletIcon} alt="Wallet icon" />
                </figure>
                  <figcaption>Processed over 1 million</figcaption>
                </div>

              </div>
              <div className="column">
                <div>
                  <figure>
                  <img src={EarthIcon} alt="Earth icon" />
                </figure>
                  <figcaption>Available in 14 Countries</figcaption>
                </div>

              </div>
            </div>
            <div className="text-center">
              <button className="ui button orange" type="submit">BUY BITCOIN</button>
            </div>
          </div>
        </section>

        {/* 100% section */}


        <section className="reasons">
          <div className="ui container">
            <div>
              <h2 className="section-header">BTCWallet is 100%</h2>
            </div>

            <div className="ui three column stackable grid ">
              <div className="column">
                <div className="card">
                  <figure>
                    <img src={TrustIcon}/> 
                </figure>
                  <figcaption>
                    <p>BTC Wallet is trusted</p>
                    <p>We're early industry pioneers and have been around since 2013, successfully processed more than</p>  
                  </figcaption>
                </div>

              </div>
              <div className="column">
              <div className="card">
                  <figure>
                    <img src={EarthIcon2}/> 
                </figure>
                  <figcaption>
                    <p>Global Expertise</p>
                    <p>We're early industry pioneers and have been around since 2013, successfully processed more than</p>  
                  </figcaption>
                </div>

              </div>
              <div className="column">
              <div className="card">
                  <figure>
                    <img src={VerifiedIcon}/> 
                </figure>
                  <figcaption>
                    <p>100% secure</p>
                    <p>We're early industry pioneers and have been around since 2013, successfully processed more than</p>  
                  </figcaption>
                </div>

              </div>
            </div>
            
          </div>
        </section>

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
