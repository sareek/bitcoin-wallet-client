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
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                  </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                  <Grid.Column>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                  </Grid.Column>
                  </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <p>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                  </Grid.Column>
                  <Grid.Column>
                   <Image src={Img} size='large' rounded />
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
