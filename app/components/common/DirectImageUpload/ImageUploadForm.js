import React from 'react';
import { Input, Modal, Button, Image, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { DOCUMENT_URL_UPDATE } from 'containers/App/constants';

const DirectImageUploadForm = props => {
  const {
    handleUploadImage,
    uploadedImageInfo,
    handleCopyLink,
    imageModalStatus,
    handleModalClose,
    showUploadedImages,
    imageList,
  } = props;

  return (
    <div>
      {
        <Modal open={imageModalStatus} onClose={handleModalClose} closeIcon>
          <Modal.Header>Previously Uploaded Images</Modal.Header>
          <Modal.Content image scrolling>
            {imageList &&
              imageList.dataList &&
              imageList.dataList.map((eachImage, index) => (
                <div
                  key={`images-${index}`}
                  style={{ textAlign: 'textCenter', padding: '0 10px' }}
                >
                  <div style={{ width: '220px' }}>
                    <img
                      style={{
                        objectFit: 'contain',
                        height: '220px',
                        width: '220px',
                        backgroundColor: '#444',
                      }}
                      src={`${DOCUMENT_URL_UPDATE}${eachImage.image_name &&
                        eachImage.image_name.document_name}`}
                      alt={`uploaded_image_${index}`}
                      onClick={e => handleCopyLink(e, index)}
                    />
                  </div>
                  <Input
                    name="modal-input"
                    id={`image_link_${index}`}
                    fluid
                    action={{
                      color: 'teal',
                      labelPosition: 'right',
                      icon: 'copy',
                      content: 'Copy',
                      onClick: e => handleCopyLink(e, index),
                    }}
                    value={eachImage.path}
                  />
                </div>
              ))}
          </Modal.Content>
        </Modal>
      }
      <label>
        <b>
          Please drop the image you want to use in the editor in the dropzone
          below and paste the link
        </b>
      </label>
      <Button
        positive
        onClick={showUploadedImages}
        data-tooltip="Previously uploaded images"
      >
        <Icon name="images" />
      </Button>
      <Dropzone
        className="dropzone"
        onDrop={handleUploadImage}
        name="image"
        multiple={false}
        accept="image/png,image/jpeg,image/jpg"
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <span className="link">
              Drop Image Here <strong>(only png, jpeg or jpg accepted)</strong>
            </span>
          </div>
        )}
      </Dropzone>
      {uploadedImageInfo && (
        <Input
          name="link-input"
          id="image_link_input"
          action={{
            color: 'teal',
            labelPosition: 'right',
            icon: 'copy',
            content: 'Copy',
            onClick: e => handleCopyLink(e, 'input'),
          }}
          value={uploadedImageInfo}
          fluid
        />
      )}
      <br />
    </div>
  );
};

export default DirectImageUploadForm;
