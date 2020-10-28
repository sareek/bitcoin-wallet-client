import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Toaster from 'components/Toaster';
import { uploadImageRequest } from './actions';
import {
  makeSelectRequesting,
  makeSelectResponse,
  makeSelectError,
  makeSelectSuccess,
  makeSelectImageUploadRes,
} from './selectors';

import ImageUploaderForm from './ImageUploaderForm';
import saga from './sagas';
import reducer from './reducer';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import { DOCUMENT_URL_UPDATE } from 'containers/App/constants';

const mapStateToProps = createStructuredSelector({
  success: makeSelectSuccess(),
  requesting: makeSelectRequesting(),
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  uploadRes: makeSelectImageUploadRes(),
});

const mapDispatchToProps = dispatch => ({
  uploadImageRequest: (file, url) => dispatch(uploadImageRequest(file, url)),
});

class ImageUploader extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  state = {};

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.uploadRes !== this.props.uploadRes) {
      this.setState({
        image_url:
          DOCUMENT_URL_UPDATE +
          (nextProps.uploadRes && nextProps.uploadRes.toJS().document_name),
      });
    }
    if (nextProps.api_url !== this.props.api_url) {
      this.setState({ api_url: nextProps.api_url }, () => {});
    }
  }

  handleChange = e => {
    if (e.target.name == 'image_url') {
      this.setState({ image_url: e.target.value });
    }
  };

  uploadImage = file => {
    return this.props.uploadImageRequest(file, this.props.api_url);
  };
  copyToClipboard = event => {
    const target = event.target.dataset.copytarget;
    const selectedText = target ? document.querySelector(target) : null;
    if (selectedText && selectedText.select) {
      selectedText.select();
    }
    try {
      document.execCommand('copy');
      event.target.focus();
      this.setState({ copySucceed: 'Copied!' });
    } catch (err) {
      alert('please press ctrl/cmd + c  to copy');
    }
  };
  render() {
    const { image_url } = this.state;
    const { successResponse, errorResponse, requesting } = this.props;

    let message = null;

    if (errorResponse && typeof errorResponse === 'string') {
      message = <Toaster message={errorResponse} timeout={5000} error />;
    }
    return (
      <div>
        {message && message}
        <ImageUploaderForm
          uploadImage={this.uploadImage}
          image_url={image_url}
          copyToClipboard={this.copyToClipboard}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'imageUpload', reducer });
const withSaga = injectSaga({ key: 'imageUpload', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ImageUploader);
