/**
 * Created by narahari on 2/13/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Toaster from 'components/Toaster';
import saga from './sagas';
import reducer from './reducer';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';

import {
  clearMessage,
  uploadImageRequest,
  loadModuleImageRequest,
} from './actions';

import {
  makeSelectRequesting,
  makeSelectResponse,
  makeSelectError,
  makeSelectSuccess,
  makeSelectImageUploadData,
  makeSelectImageList,
} from './selectors';

import ImageUploadForm from './ImageUploadForm';

const mapStateToProps = createStructuredSelector({
  success: makeSelectSuccess(),
  requesting: makeSelectRequesting(),
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  imageUploadResponse: makeSelectImageUploadData(),
  imageList: makeSelectImageList(),
});

const mapDispatchToProps = dispatch => ({
  clearMessage: () => dispatch(clearMessage()),
  uploadImage: (data, image) => dispatch(uploadImageRequest(data, image)),
  loadModuleImage: module => dispatch(loadModuleImageRequest(module)),
});

class DirectImageUpload extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    image: [],
    imageModalStatus: false,
  };

  componentDidMount() {
    this.props.clearMessage();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imageUploadResponse !== this.props.imageUploadResponse) {
      this.setState({
        uploadedImageInfo: nextProps.imageUploadResponse.toJS().path,
      });
    }

    if (
      nextProps.imageList &&
      nextProps.imageList.size > 0 &&
      nextProps.imageList !== this.props.imageList
    ) {
      this.setState({
        imageList: nextProps.imageList.toJS(),
      });
    }
  }

  handleUploadImage = image => {
    if (image[0]) {
      this.props.uploadImage(
        { module: this.props.module || 'common' },
        image[0],
      );
    }
  };

  handleCopyLink = (e, index) => {
    var copyText = document.getElementById(`image_link_${index}`);
    copyText.select();
    document.execCommand('copy');
  };

  handleModalClose = () => {
    this.setState(state => {
      return { imageModalStatus: false };
    });
  };

  showUploadedImages = () => {
    this.setState({ imageModalStatus: true }, () => {
      this.props.loadModuleImage(this.props.module);
    });
  };

  render() {
    const { uploadedImageInfo, imageModalStatus, imageList } = this.state;
    const { successResponse, errorResponse, requesting } = this.props;
    let message = null;
    if (successResponse && typeof successResponse === 'string') {
      message = <Toaster message={successResponse} timeout={5000} success />;
    }
    if (errorResponse && typeof errorResponse === 'string') {
      message = <Toaster message={errorResponse} timeout={5000} error />;
    }
    return (
      <div>
        {message && message}

        <ImageUploadForm
          handleUploadImage={this.handleUploadImage}
          uploadedImageInfo={uploadedImageInfo}
          handleCopyLink={this.handleCopyLink}
          requesting={requesting}
          imageModalStatus={imageModalStatus}
          handleModalClose={this.handleModalClose}
          showUploadedImages={this.showUploadedImages}
          imageList={imageList}
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
)(DirectImageUpload);
