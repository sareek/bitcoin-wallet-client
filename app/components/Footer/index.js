import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Logo3 from '../../assets/Btcwallet_logo/Version 3/Btcwallet_logo_3-01.png'


export class Footer extends React.PureComponent {
  render() {

    return (
      <React.Fragment>
        <footer id="footer">
          <div className="ui container">
            <div>
              <a href=" https://www.bitcoinwallet.io/" target="_blank">
                <img src={Logo3} alt="BTC Wallet logo " />
              </a>
              <p>&copy; Copyright(2019)</p>
            </div>

            

            <div className="footer-menu">
              <a href="https://www.bitcoinwallet.io/term-of-use.html" target="_blank"> About </a>
              <a href="https://www.bitcoinwallet.io/term-of-use.html" target="_blank"> Products </a>
              <a href="https://www.bitcoinwallet.io/term-of-use.html" target="_blank"> Resources </a>
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
