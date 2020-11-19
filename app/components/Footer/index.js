import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


export class Footer extends React.PureComponent {
  render() {
 
    return (
      <React.Fragment>
        <footer id="footer">
          <div>
            <div><a href=" https://www.bitcoinwallet.io/" target="_blank">Powered by: Bitcoin Wallet</a></div>

            <div> &copy; Copyright(2019)</div>

            <div>
               <a href="https://www.bitcoinwallet.io/term-of-use.html" target="_blank"> Terms of use </a>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}
const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps)(Footer);
