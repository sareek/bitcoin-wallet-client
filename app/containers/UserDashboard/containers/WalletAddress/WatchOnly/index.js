import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, Segment, Popup, Grid  } from 'semantic-ui-react';

import { clearState, getWatchOnlyAddressRequest, generateWatchOnlyWalletAddress } from './actions';
import { 
   makeSelectGetWatchOnlyAddressRequesting, 
   makeSelectPostWatchOnlyAddressRequesting,
   makeSelectSuccess, 
   makeSelectError, 
   makeSelectGetWatchOnlyAddressResponse,
   makeSelectGenerateWatchOnlyAddressResponse,
   makeSelectPostWatchOnlyError
} from './selectors';
import saga from './sagas'
import reducer from './reducer'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {compose} from "redux";
import AddWatchOnly from '../components/AddWatchOnly';
import WatchOnlyTable from 'components/Table';
import { text_truncate } from "utils/helperFunctions";

import { toast } from 'react-toastify';

const mapStateToProps = createStructuredSelector({
  errorResponse: makeSelectError(),
  getWatchOnlyAddressRequesting: makeSelectGetWatchOnlyAddressRequesting(),
  postWatchOnlyAddressRequesting: makeSelectPostWatchOnlyAddressRequesting(),
  success: makeSelectSuccess(),
  getWatchOnlyAddressResponse: makeSelectGetWatchOnlyAddressResponse(),
  generateWatchOnlyAddressResponse: makeSelectGenerateWatchOnlyAddressResponse(),
  postWatchOnlyError: makeSelectPostWatchOnlyError(),
});

const mapDispatchToProps = dispatch => ({
  dispatchGetWatchOnlyAddressRequest: payload => dispatch(getWatchOnlyAddressRequest(payload)),
  dispatchGenerateWatchOnlyWalletAddress: payload => dispatch(generateWatchOnlyWalletAddress(payload)),
  clearState: () => dispatch(clearState())
});

class WatchOnlyAddress extends React.Component {
  static propTypes = {

  };
  state = {
    showAddWalletModal: false,
    data: {
    },
    walletAddressesList: [],
    errors: {},
    copiedBit: false,
    copiedAddress: ''
  };

  componentDidMount() {
    this.props.dispatchGetWatchOnlyAddressRequest();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.generateWatchOnlyAddressResponse != prevProps.generateWatchOnlyAddressResponse) {
      if (this.props.generateWatchOnlyAddressResponse &&
        this.props.generateWatchOnlyAddressResponse.toJS() &&
        this.props.generateWatchOnlyAddressResponse.toJS().status === 200) {
        this.setState({ showAddWalletModal: false }, () => {
          toast.success("Operation Sucess");
          this.props.dispatchGetWatchOnlyAddressRequest();
        })
      }
    }

    if (this.props.getWatchOnlyAddressResponse != prevProps.getWatchOnlyAddressResponse) {
      if (this.props.getWatchOnlyAddressResponse &&
        this.props.getWatchOnlyAddressResponse.toJS() &&
        this.props.getWatchOnlyAddressResponse.toJS().status === 200) {
          this.setState({walletAddressesList: this.props.getWatchOnlyAddressResponse.toJS().data.address_list});
        }
    }

    if (this.props.postWatchOnlyError != prevProps.postWatchOnlyError) {
      if (this.props.postWatchOnlyError &&
        this.props.postWatchOnlyError.toJS() &&
        this.props.postWatchOnlyError.toJS().status === 400) {
          this.setState({ showAddWalletModal: false }, () => {
            toast.error("Address Exists");
          })
        }
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  showAddWalletModal = () => {
    this.setState({ showAddWalletModal: true, data: {}, errors: {}})
  }

  hideModal = () => {
    this.setState({ showAddWalletModal: false, data: {}, errors: {} })
  }

  handleChange = e => {
    e.persist();
    delete this.state.errors[e.target.name];
    this.setState(state => ({
      data: {
        ...state.data,
        [e.target.name]: e.target.value,
      },
    }));
  }

  handleSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.dispatchGenerateWatchOnlyWalletAddress({ label: data.label, address: data.address })
    }
  };

  validate = () => {
    const { data } = this.state;
    const errors = {};
    if (!data.label) errors.label = "Can't be blank";
    if (!data.address) errors.address = "Can't be blank";

    return errors;
  };

  copyToClipBoard = (address) => {
    var dummyElement = document.createElement('input'),
      copyText = address;
    document.body.appendChild(dummyElement);
    dummyElement.value = copyText;
    dummyElement.select();
    document.execCommand('copy');
    document.body.removeChild(dummyElement);
    this.setState({copiedBit: true, copiedAddress: address});
    setTimeout(() => {
      this.setState({copiedBit: false, copiedAddress: ''});
    }, 1000);
  };
 
  render() {
    const { showAddWalletModal, data, errors, walletAddressesList, copiedBit, copiedAddress  } = this.state;
    const { getWatchOnlyAddressRequesting, postWatchOnlyAddressRequesting } = this.props;

    const headers = [
      {
        key: 1,
        name: 'Wallet Label',
        field: 'label',
      },
      {
        name: 'Address',
        key: 2,
        format: data => {
          return (
            <>
             <Grid columns='equal'>
              <Grid.Column width={14}>
                <Popup
                    trigger={  
                    <div className="wallet-address-table">
                      {data
                        ? text_truncate(data.address ?  data.address : "---", 33) 
                        : '---'}
                      </div>}
                    content={data.address}
                    basic
                  /> 
              </Grid.Column>
              <Grid.Column width={2}>
              <Popup
                content={copiedBit ? 'copied' : 'copy'}
                on='click'
                open={copiedAddress === data.address}
                trigger={<button
                  type="button"
                  name="copyToken"
                  value="copy"
                  className="copyToken ui right icon button"
                  onClick={() => this.copyToClipBoard(data.address)}
                >
                  <i className="copy icon"></i>
                </button>}
              />
              </Grid.Column>
            </Grid>
          </>
        )
        },
      },
      {
        name: 'Balance',
        key: 3,
        format: data => {
          return data
            ? data.balance
            : '---';
        },
      }
    ];
   
    return (
      <Segment>
       <div className="tbl-heading"><span className="tbl-title"><i className="list ul icon"></i> Wallet Addresses </span> <Button
          content="New Wallet"
          labelPosition='right'
          icon='add circle'
          color="orange"
          onClick={this.showAddWalletModal}
          title="Add new Wallet"
        />
        </div>
       {!!showAddWalletModal && (
          <AddWatchOnly
            title="Add Watch Only Address"
            isRequesting={postWatchOnlyAddressRequesting}
            hideModal={this.hideModal}
            showModal={showAddWalletModal}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            data={data}
            errors={errors}
          />
        )}
          <WatchOnlyTable
          headers={headers}
          tableData={walletAddressesList}
          requesting={getWatchOnlyAddressRequesting}
        />
      </Segment>
    );
  }
}

const withReducer = injectReducer({ key: 'watchOnlyAddress', reducer });
const withSaga = injectSaga({ key: 'watchOnlyAddress', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WatchOnlyAddress);
