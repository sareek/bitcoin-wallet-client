import React from 'react';
import PropTypes from 'prop-types';
import {createStructuredSelector} from 'reselect';
import { connect } from 'react-redux';
import { updateBasicInfoRequest, basicInfoClearState } from './actions';
import { makeSelectResponse, makeSelectError, makeSelectRequesting, makeSelectSuccess } from './selectors';
import { DOCUMENT_URL_UPDATE } from 'containers/App/constants';
import { makeSelectUser } from 'containers/App/selectors';
import BasicInfoForm from './BasicInfoForm';
import Toaster from "components/Toaster";
import saga from './sagas'
import reducer from './reducer'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {compose} from "redux";

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
    imageFile: null,
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
    this.setState({
      data: {
        ...this.state.data,
        [se.name]: se.value
      }
    })
  }

  handleRadioChange = (e, { name, value }) => {
    this.setState({ data: { ...this.state.data, [name]: value } });
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const { data, imageFile, files } = this.state;
    console.log({data}, {files})
    const errors = this.validateForm();
    debugger;
    if (!!files) {
      this.props.updateBasicInfoRequest(data, files);
    } else {
      this.props.updateBasicInfoRequest(data);
    }
  };

  validateForm = () => {
     const { data } = this.state;
     const errors = {};
     if (!data.first_name) errors.first_name = 'Please enter your first name';
     if (!data.last_name) errors.last_name = 'Please enter your last name';

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
