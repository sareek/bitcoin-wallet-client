/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import './styles.css';

const FileDropZone = ({
  files,
  errors,
  fileName,
  errorName,
  handleOnDrop,
  handleOnDropRejected,
  handleFileRemove,
}) => (
  <>
    <div className="d-flex flex-row">
      <Dropzone
        onDrop={file => {
          handleOnDrop(file, fileName);
        }}
        onDropRejected={file => {
          handleOnDropRejected(file, fileName);
        }}
        accept=".png, .jpg"
        maxSize={10485760}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="dropzone">
            <div {...getRootProps()}>
              <input {...getInputProps()} name="files" multiple />
              <span className="link">
                <strong>Drop file here.</strong>
              </span>
            </div>
          </section>
        )}
      </Dropzone>
      <div className="text-center">
        <Button
          style={{borderRadius: "20px"}}
          color="orange"
          className="remove__file ml-2"
          title="remove file"
          type="reset"
          onClick={() => {
            handleFileRemove(fileName, errorName);
          }}
        >
          Remove
        </Button>
      </div>
    </div>
    {errors && Object.keys(errors).includes(errorName) && (
      <p style={{ color: 'red' }}>{errors[errorName]}</p>
    )}
    {files[fileName] && files[fileName].length === 1 && (
      <div className="card-md mt-3" key={`image_original_name_${JSON.stringify(files[fileName])}`}>
        <h6>
          Attached file: <span className="file__name">{files[fileName][0].name}</span>
        </h6>
      </div>
    )}
  </>
);

FileDropZone.propTypes = {
  files: PropTypes.object,
  errors: PropTypes.object,
  fileName: PropTypes.string,
  errorName: PropTypes.string,
  setMultiple: PropTypes.bool,
  uploadDocumentRequesting: PropTypes.bool,
  handleOnDrop: PropTypes.func,
  handleOnDropRejected: PropTypes.func,
  handleFileRemove: PropTypes.func,
};

export default FileDropZone;
