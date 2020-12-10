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
  makeSelectError,
  makeSelectUser,
  makeSelectBitcoinExchangeRequesting,
  makeSelectBitcoinExchangeData
} from './selectors';
import { Grid, Segment, Message, Divider } from 'semantic-ui-react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

import {
  loadBasicInfoRequest,
  getBitcoinExchangesRequest
} from './actions'

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  user: makeSelectUser(),
  bitcoinExchangeRequesting: makeSelectBitcoinExchangeRequesting(),
  bitcoinExchangeData: makeSelectBitcoinExchangeData()
});

const mapDispatchToProps = dispatch => ({
  dispatchLoadBasicInfoRequest: (userEmail) => dispatch(loadBasicInfoRequest(userEmail)),
  dispatchGetBitcoinExchangesRequest: () => dispatch(getBitcoinExchangesRequest())
});

class DashboardMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {}
    };
  }
  componentDidMount() {
    this.props.dispatchLoadBasicInfoRequest();
    this.props.dispatchGetBitcoinExchangesRequest();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  renderBitcoinExchangesGraph({ values }) {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    let xAxis = chart.xAxes.push(new am4charts.DateAxis());
    xAxis.title.text = "Date";
    xAxis.title.fontWeight = "bold";

    chart.paddingRight = 20;
    chart.data = values;
    chart.responsive.enabled = true;

    let title = chart.titles.create();
    title.text = "Bitcoin Chart";
    title.fontSize = 25;
    title.marginBottom = 30;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 15;

    valueAxis.title.text = "Price (USD)";
    valueAxis.title.fontWeight = "bold";
    valueAxis.renderer.labels.template.adapter.add("text", (label, target, key) => {
      return label + " (USD)";
    })

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "${valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      const user = this.props.user.toJS();
      this.setState({
        userDetails: user,
      });
    }

    if (prevProps.bitcoinExchangeData !== this.props.bitcoinExchangeData) {
      const bitcoinExchangeData = this.props.bitcoinExchangeData.toJS();
      /////////////////////////Graph logic here
      if(bitcoinExchangeData && bitcoinExchangeData.values && bitcoinExchangeData.values.length > 0) {
        this.renderBitcoinExchangesGraph(bitcoinExchangeData);
      }
    }
  }

  render() {
    const { userDetails } = this.state;
    const { bitcoinExchangeRequesting } = this.props;
    return (
      <div>
        <Grid divided='vertically' doubling stackable>
          <Grid.Row >
            <Grid.Column computer={11} tablet={16}>
              <div className="main-heading">
                <p className="title">  <i className="icon tv"></i> Welcome, <span className="text-muted">
                  {userDetails && userDetails.username ? ` ${userDetails.username}` : ''}
                </span> </p>
              </div>
              <Segment className="welcome-dashboard">
                <Message>
                <h2>Welcome Note</h2>
                  <div>
                    <p>
                    Welcome to your personal BtcWallet account. Your account is ready to securely send and receive bitcoin. To enjoy full functionalities of this wallet, you may need to verify your account by using the KYC Form in PROFILE, or you can contact us through <b>info@btcwallet.uk.com</b> if you need further assistance.
                 </p>
                    <Divider clearing />
                    <p> To keep your account more secured, please enable your Two-Factor Authenticator in SETTINGS.</p>
                  </div>
                </Message>
              </Segment>
              <Segment>
                {!bitcoinExchangeRequesting ? (
                  <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
                ) : (
                    <div className="loader_wallet m-5"></div>
                  )}
              </Segment>
              {/* <Segment className="main-statistics">
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
              </Segment> */}
            </Grid.Column>
            <Grid.Column computer={5} tablet={16}>
              <Segment className="announcements">
                <div className="sm-heading"><p className="title"><span><i className="icon bullhorn"></i></span> Announcements </p></div>
                <p>With growing popularity for the use and storage of different cryptocurrencies in recent times,  Btcwallet is subject to update and upgrade its platform periodically. We are pleased to inform you that more cryptocurrencies like Bitcoin-cash, Ethereum, Litecoin and Tether will be added in the second quarter of 2021.</p>
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
