import React from 'react';
import Dropzone from 'react-dropzone';
import 'react-datepicker/dist/react-datepicker.css';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

const ImageUploaderForm = props => {
  const { uploadImage, image_url, copyToClipboard, handleChange } = props;

  return (
    <div>
      <label>
        <i>
          Note: To upload image in tinymce, First upload it to cloudinary
          through given below dropzone and copy the given link in tinymce image
          plugin
        </i>
      </label>
      <Dropzone
        className="dropzone"
        multiple={false}
        accept="image/*"
        onDrop={uploadImage}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <span className="link">
              Drop Image here to get link
              <strong>(recommended size (700*350))</strong>
            </span>
          </div>
        )}
      </Dropzone>
      <div>
        {image_url && (
          <div>
            <b>Link</b>
            <br />
            {/* <p>{this.state.uploadedFile.name}</p> */}
            <input
              id="refer-code"
              placeholder="Cloudinary Link Appear Here"
              value={image_url || ''}
              name="image_url"
              onChange={handleChange}
              style={{ width: '650px' }}
            />
            {document.queryCommandSupported('copy') && (
              <button
                data-copytarget="#refer-code"
                className="ui icon secondary button"
                onClick={e => {
                  copyToClipboard(e);
                  // this.handleShowCopyMsg();
                }}
              >
                Copy
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploaderForm;
