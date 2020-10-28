import React from 'react';
import Dropzone from 'react-dropzone';
import { DOCUMENT_URL_UPDATE } from 'containers/App/constants';

const DropzoneComponent = props => {
  const { file, image, onDrop } = props;

  const showImage = file => {
    if (file)
      if (['image/png', 'image.jpg', 'image/jpeg'].includes(file.type)) {
        return (
          <div
            style={{ overflow: 'hidden', padding: '10px' }}
            className="image__holder"
          >
            <img
              style={{
                objectFit: 'contain',
                height: '200px',
                backgroundColor: '#444',
              }}
              className="img-fluid"
              src={file.preview}
              alt=""
            />
          </div>
        );
      } else if (Object.keys(file).length > 1) {
        const imageSRC = file.document_name ? file.document_name : file;
        return (
          <div
            style={{ overflow: 'hidden', padding: '10px' }}
            className="image__holder"
          >
            <img
              style={{
                objectFit: 'contain',
                height: '200px',
                backgroundColor: '#444',
              }}
              className="img-fluid"
              src={`${DOCUMENT_URL_UPDATE}${imageSRC}`}
              alt={file.image_alt_text}
            />
          </div>
        );
      }
  };

  return (
    <div>
      <Dropzone
        className="dropzone"
        onDrop={onDrop}
        multiple={false}
        accept=".jpg, .jpeg, .png"
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <span className="link">
              Drop Image <strong>(recommended size (700*350))</strong>
            </span>
          </div>
        )}
      </Dropzone>

      {Object.keys(file).length > 0 ? showImage(file) : showImage(image)}
    </div>
  );
};
export default DropzoneComponent;
