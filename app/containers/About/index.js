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

import { Header, Breadcrumb, Container, Grid , Image} from 'semantic-ui-react'

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
          <div className="bg-img">
          <Image src={Img} alt="bitcoin tech background image" />
        
          </div>


          <Breadcrumb>
            <Header>About Us</Header>
             <Link to= "/">
            <Breadcrumb.Section>Home</Breadcrumb.Section>
            </Link>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>About</Breadcrumb.Section>
          </Breadcrumb>


        </section>
        <section className="about-page-content">
          <Container>
            <h2 className="section-header text-center">About Us Page Heading</h2>
            <Grid stackable>
            <Grid.Row>
                  <Grid.Column>
                  <p>Crypto has the capacity to force a redesign of the Internet, our financial system, and money in a way that fosters and protects the rights and dignity of the individual. BTCwallet is founded with a “security-first” mentality. It is one of the world’s most trusted and secured cryptocurrency platform. We tend to continually upgrade our platform to suit the growing needs of crypto users. Our vision and goal are well defined, and we are working hard to develop the functionality and continually improve the features.</p>
                  </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                  <Grid.Column>
                  <p>
                    BtcWallet is a new type of web wallet which aims to combine 
                    <ul>
                      <li>security,</li>
                      <li>usability and </li>
                      <li>multi-currency support.</li>
                    </ul>  
                    </p>
                  </Grid.Column>
                  </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <h3>Best level of security</h3>
                    <p>We’ve assembled a global team of top security professionals who take a risk-based approach to ensuring our clients’ assets are protected at the highest levels while maintaining exceptional performance and an unparalleled client experience. Our team has decades of experience building security programs for the world’s top brands, investigating the largest consumer data breaches, developing security technology trusted by millions of businesses and discovering vulnerabilities in the technology used by billions of people every day. Aside all of that we also ensure that Private keys are never sent to the server except in an encrypted form. </p>
                  </Grid.Column>
                  <Grid.Column>
                   <Image src={Img} size='large' rounded />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <h3>Usability</h3>
                    <p>BtcWallet has a carefully planned layout, with common operations emphasized. It has a beautiful and intuitive User Interface, and special care is taken to smooth out operational edge cases to prevent mistakes and ensure a painless experience for the user.</p>
                  </Grid.Column>
                  <Grid.Column>
                  <h3>Multi-currency support</h3>
                  <p>Btcwallet comes with a pre-built support for Bitcoin and bitcoin cash, but definitely plans to expand it numbers of supported cryptocurrency. </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
          
          </Container>
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
