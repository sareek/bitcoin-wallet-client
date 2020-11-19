import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
class HomeLayout extends React.Component {
  render() {
    return (
      <div className="web__wrap">
        <Header {...this.props} />
        <div className="web__main">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default HomeLayout;
