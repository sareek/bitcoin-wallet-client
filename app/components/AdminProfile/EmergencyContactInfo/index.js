import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getEmergencyContactInfoRequest,
  addEmergencyContactInfoRequest,
  updateEmergencyContactInfoRequest,
  removeEmergencyContactInfoRequest,
  emergencyContactInfoClearMessages
} from './actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from 'containers/App/selectors';
import {
  makeSelectEmergencyContactInfo,
  makeSelectEmergencyContacts,
  makeSelectSuccessResponse,
  makeSelectErrorResponse,
  makeSelectRequesting,
  makeSelectSuccess
} from './selectors';
import { Button } from 'semantic-ui-react';
import Toaster from 'components/Toaster';
import ContactInfoCard from './ContactInfoCard';
import ContactInfoForm from './ContactInfoForm';
import getLocationObject from "utils/getLocationObject";
import saga from './sagas'
import reducer from './reducer'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from "redux";

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  emergencyContactInfo: makeSelectEmergencyContactInfo(),
  emergencyContacts: makeSelectEmergencyContacts(),
  successResponse: makeSelectSuccessResponse(),
  errorResponse: makeSelectErrorResponse(),
  isRequesting: makeSelectRequesting(),
  success: makeSelectSuccess()
});

const mapDispatchToProps = (dispatch) => ({
  getEmergencyContactInfoRequest: (userId) => dispatch(getEmergencyContactInfoRequest(userId)),
  addEmergencyContactInfo: (data, userId) => dispatch(addEmergencyContactInfoRequest(data, userId)),
  updateEmergencyContactInfo: (data, userId, id) => dispatch(updateEmergencyContactInfoRequest(data, userId, id)),
  removeEmergencyContactInfo: (userId, id) => dispatch(removeEmergencyContactInfoRequest(userId, id)),
  emergencyContactInfoClearMessages: () => dispatch(emergencyContactInfoClearMessages())
});

const dataObj = {
  person_name: '',
  email: '',
  mobile_number: '',
  phone_number: '',
  country_code: '',
  country_abbr: '',
  relationship: 'family',
  location: {},
};

class EmergencyContactInfo extends React.Component {
  static propTypes = {
    getEmergencyContactInfoRequest: PropTypes.func.isRequired,
    addEmergencyContactInfo: PropTypes.func.isRequired,
    updateEmergencyContactInfo: PropTypes.func.isRequired,
    removeEmergencyContactInfo: PropTypes.func.isRequired,
  };
  state = {
    data: dataObj,
    emergencyContacts: [],
    showAddForm: false,
    error: {},
    message: {},
    mobileNumberModified: false,
    validationErrors: {}
  };
  componentDidMount() {
    this.props.getEmergencyContactInfoRequest(this.props.user.get('_id'));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.emergencyContacts && nextProps.emergencyContacts !== this.props.emergencyContacts) {
      this.setState({ emergencyContacts: nextProps.emergencyContacts.toJS() });
    }
    if (nextProps.success !== this.props.success && nextProps.success) {
      this.setState({ data: dataObj, showAddForm: false, validationErrors: {} });
    }
  }
  handleChange = (e) => this.setState({
    data: {
      ...this.state.data,
      [e.target.name]: e.target.value,
    },
  });
  handleSelectInput = (e, { name, value }) => this.setState({
    data: {
      ...this.state.data,
      [name]: value,
    },
  });
  locationValChange = () => {
    const { location, coordinates } = getLocationObject(null);
    this.setState({
      data: {
        ...this.state.data,
        location: { ...location, coordinates }
      },
    });
  };
  onSuggestSelect = (suggest) => {
    const { location, coordinates } = getLocationObject(suggest);
    this.setState({
      data: {
        ...this.state.data,
        location: { ...location, coordinates }
      },
    });
  };
  setMobileNumber = mobileObj => {
    const { mobile_number, country_code, country_abbr } = mobileObj;
    this.setState(state => ({
      data: { ...state.data, mobile_number, country_code, country_abbr }
    }));
  };
  showAddContactForm = () => this.setState({ showAddForm: true }, () => {
    this.props.emergencyContactInfoClearMessages();
  });
  validate = () => {
    const errors = {};
    const { data } = this.state;
    if (!data.person_name) errors.person_name = "Can't be blank";
    if (!data.email) errors.email = "Can't be blank";
    if (!data.mobile_number) errors.mobile_number = "Please enter mobile number";
    // if (data.phone_number.length > 0 && !data.phone_number.match(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)) errors.phone_number = "Must be valid number";
    if (data.phone_number.length > 0 && !data.property_phone.match(/^[0-9+ ]{6,16}$/)) errors.phone_number = "Accepts International number only.";
    // if (data.phone_number.length > 0 && !data.property_phone.match(/^\+(?:[0-9] ?){6,14}[0-9]$/)) errors.phone_number = "Accepts International number only. Start with '+'";
    if (!data.location || (data.location && (data.location.country==="" || !data.location.country))) errors.location = "Can't be blank";
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { data } = this.state;
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      if (!!data._id) {
        this.props.updateEmergencyContactInfo(data, this.props.user.get('_id'), data._id);
      } else {
        this.props.addEmergencyContactInfo(data, this.props.user.get('_id'));
      }
    }
  };
  handleCancel = (e) => {
    e.preventDefault();
    this.props.emergencyContactInfoClearMessages();
    this.setState({ data: dataObj, showAddForm: false, error: {} });
  };
  handleEdit = (e, { name }) => {
    e.preventDefault();
    const editingContact = this.state.emergencyContacts.filter(i => i._id === name)[0];
    this.setState({ data: editingContact, showAddForm: true }, () => {
      this.props.emergencyContactInfoClearMessages();
    });
  };
  handleRemove = (e, { name }) => {
    e.preventDefault();
    this.props.removeEmergencyContactInfo(this.props.user.get('_id'), name);
  };
  render() {
    const { showAddForm, data, emergencyContacts, mobileNumberModified, errors } = this.state;
    const { successResponse, errorResponse, isRequesting } = this.props;
    let message;
    if (successResponse && typeof successResponse === 'string') {
      message = <Toaster message={successResponse} timeout={1000} success />;
    }
    if (errorResponse && typeof errorResponse === 'string') {
      message = <Toaster message={errorResponse} timeout={1000} error />;
    }
    return (
      <div className="">
        {message && message}
        <div className="two column grid">
          <div className="column">
            <span>{emergencyContacts.length} out of 2 added{' '}</span>
          </div>
          <div className="column align-right">
            {!showAddForm && emergencyContacts.length < 2 &&
            <Button className="primary" onClick={this.showAddContactForm}>Add a contact</Button>}
          </div>
        </div>
        {!showAddForm && emergencyContacts.map(contact =>
          <ContactInfoCard key={contact._id} handleRemove={this.handleRemove} handleEdit={this.handleEdit}
                           contact={contact}
          />
        )}
        {showAddForm &&
        <ContactInfoForm handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} handleChange={this.handleChange}
                         handleSelectInput={this.handleSelectInput} handleMobileChange={this.handleMobileChange}
                         onMobileCountryChange={this.onMobileCountryChange} locationValChange={this.locationValChange}
                         onSuggestSelect={this.onSuggestSelect} data={data} mobileNumberModified={mobileNumberModified}
                         loading={isRequesting} errors={errors}  setMobileNumber={this.setMobileNumber}
        />}
        <br/>
        <p className="note">
          In an unfortunate event of emergency, the user may trigger
          the from with in the app by simply pressing on the icon.
          Instantly an email shall be sent to the list of trusted emergency contact peron's mailbox
          along with an SMS to your mobile phone which the user has registered in his system”.
          The email and sms shall carry information related to the last known location and contact details
          of the user along with the contact details of our SOS Response System Representative.
        </p>
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'adminProfileEmergencyContactInfo', reducer });
const withSaga = injectSaga({ key: 'adminProfileEmergencyContactInfo', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EmergencyContactInfo);
