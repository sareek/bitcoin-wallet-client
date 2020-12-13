import React from 'react';
import PropTypes from 'prop-types';
import {createStructuredSelector} from 'reselect';
import { connect } from 'react-redux';
import { updateBasicInfoRequest, basicInfoClearState } from './actions';
import { makeSelectResponse, makeSelectError, makeSelectRequesting, makeSelectSuccess } from './selectors';
import { DOCUMENT_URL_UPDATE } from 'containers/App/constants';
import { makeSelectUser } from 'containers/App/selectors';
import BasicInfoForm from './BasicInfoForm';
import saga from './sagas'
import reducer from './reducer'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {compose} from "redux";
import * as action from "../../../utils/api";
import getToken from 'utils/getToken';
import { toast } from 'react-toastify';

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  requesting: makeSelectRequesting(),
  success: makeSelectSuccess()
});

const mapDispatchToProps = dispatch => ({
  updateBasicInfoRequest: (user, image) => dispatch(updateBasicInfoRequest(user, image)),
  clearState: () => dispatch(basicInfoClearState()),
});

class BasicInfo extends React.Component {
  static propTypes = {
    updateBasicInfoRequest: PropTypes.func.isRequired,
    clearState: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };
  state = {
    data: {},
    files: {},
    avatarImage: this.props.user.get('image_name') ? `${DOCUMENT_URL_UPDATE}${this.props.user.get('image_name')}` : null,
    errors: {}
  };
  componentDidMount() {
    if (this.props.user.size > 0) {
      const userObj = this.props.user.toJS();
      this.setState(state => ({ data: { ...userObj } }));
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      const userObj = this.props.user && this.props.user.toJS();
      this.setState(state => ({ data: { ...userObj } }));
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  handleCheckBox = e => {
    e.persist();
    this.setState(state => ({
      data: {
        ...state.data,
        [e.target.name]: !this.state.data[e.target.name]
      }
    }));
  };

  handleChange = e => {
    e.persist();
    const { errors } = this.state;
     delete errors[e.target.name];
    this.setState(state => ({
      data: {
        ...state.data,
        [e.target.name]: e.target.value
      }
    }));
  };

  handleFileRemove = (imageName, errorName) => {
    delete this.state.files[imageName];
    delete this.state.errors[errorName];
    this.setState({
      files: {
        ...this.state.files
      }
    });
    this.setState({
      errors: {
        ...this.state.errors
      }
    });
  };

  handleOnDropRejected = (receivedFiles, errorName) => {
    if (receivedFiles && receivedFiles.length > 0) {
      this.setState({
        ...errors,
        [errorName]: receivedFiles[receivedFiles.length - 1].errors[0].message,
      });
    }
  };

  handleOnDrop = (receivedFiles, fileName) => {
    if (receivedFiles.length === 1) {
      const { errors } = this.state;
       delete errors[fileName];
      receivedFiles[0].file_name = fileName;
      this.setState({
        files: {
          ...this.state.files,
          [fileName]: receivedFiles,
        }
      })
    }
    if (this.state.errors.submissionError) {
       delete this.state.errors.submissionError;
      this.setState({ 
        errors: {
          ...this.state.errors
        }
      });
    }
  };

  handleDropDown = (e, se) => {
    const { errors } = this.state;
     delete errors[se.name];
    this.setState({
      data: {
        ...this.state.data,
        [se.name]: se.value
      }
    })
  }

  handleRadioChange = (e, { name, value }) => {
    const { errors } = this.state;
     delete errors[name];
    this.setState({ data: { ...this.state.data, [name]: value } });
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const { data, files } = this.state;
    const token = getToken();
    const errors = this.validateForm();
    let multipartData;
    multipartData = new FormData();
    Object.keys(data).forEach(key => {
      multipartData.append(key, data[key]);
    });
    if (Object.keys(errors).length === 0) {
      if (!!files && files.kycFile) {
        // this.props.updateBasicInfoRequest(data, files);
        multipartData.append('file', files.kycFile[0]);
        // action.multiPartPostData(`http://3.137.188.44/api/kyc/`, multipartData, token)
        action.multiPartPostData(`https://btcwallet.uk.com/api/kyc/`, multipartData, token)
        .then(res => {
            if(res.status === 200) {
              toast.success('Successfully submitted');
            } else {
              toast.error('Error while submitting')
            }
        });
      } else {
        // this.props.updateBasicInfoRequest(data);
        // action.multiPartPostData(`http://3.137.188.44/api/kyc/`, multipartData, token)
        action.multiPartPostData(`https://btcwallet.uk.com/api/kyc/`, multipartData, token)
        .then(res => {
            if(res.status === 200) {
              toast.success('Successfully submitted');
            } else {
              toast.error('Error while submitting')
            }
        });
      }
    }
  };

  validateForm = () => {
     const { data, files } = this.state;
     const errors = {};
     if (!data.first_name) errors.first_name = 'Please enter your first name';
     if (!data.last_name) errors.last_name = 'Please enter your last name';
     if (!data.gender) errors.gender = 'Please enter your gender';
     if (!data.dob_date) errors.dob_date = 'Please enter your dob date';
     if (!data.dob_month) errors.dob_month = 'Please enter your dob month';
     if (!data.dob_year) errors.dob_year = 'Please enter your dob year';
     if (!data.country) errors.country = 'Please enter your country';
     if (!data.state) errors.state = 'Please enter your state';
     if (!data.city) errors.city = 'Please enter your city';
     if (!data.zip) errors.zip = 'Please enter your zip';
     if (!data.username) errors.username = 'Please enter your username';
     if (!data.address1) errors.address1 = 'Please enter your address';
     if (!data.email) errors.email = 'Please enter your email';
     if (Object.keys(files).length === 0) {
      errors.kycFile = 'Please upload a file to submit';
    }
     this.setState({ errors });
     return errors;
  }

  render() {
    const { data, avatarImage, files, errors } = this.state;
    const { successResponse, errorResponse, requesting } = this.props;

    return (
      <div className="segment">
        <BasicInfoForm
          user={data} 
          avatarImage={avatarImage} 
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit} 
          isLoading={requesting}
          handleCheckBox={this.handleCheckBox}
          handleGenderChange={this.handleRadioChange}
          handleFileRemove={this.handleFileRemove}
          handleOnDropRejected={this.handleOnDropRejected}
          handleOnDrop={this.handleOnDrop}
          handleDropDown={this.handleDropDown}
          files={files}
          errors={errors}
        />
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'updateBasicInfo', reducer });
const withSaga = injectSaga({ key: 'updateBasicInfo', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BasicInfo);
