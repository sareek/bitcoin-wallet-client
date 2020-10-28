import React from 'react';
import Dropzone from 'react-dropzone';
import Avatar from 'assets/images/avatar.png';
import AvatarEditor from 'react-avatar-editor';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import { DOCUMENT_URL_UPDATE } from 'containers/App/constants';
class ImageCropper extends React.Component {
  
  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.oldImage && nextProps.oldImage !== this.props.oldImage) {
      this.setState({
        avatarImage: nextProps.oldImage
          ? `${DOCUMENT_URL_UPDATE}${nextProps.oldImage}`
          : null,
      });
    }
  }

  setEditorRef = editor => (this.editor = editor);

  onCrop = e => {
    e.preventDefault();
    if (this.editor) {
      const canvas = this.editor.getImage().toDataURL();
      fetch(canvas)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], this.state.fileName, {
            type: this.state.fileType,
          });
          this.setState(
            {
              imageFile: file,
              avatarImage: canvas,
              newImage: false,
            },
            () => {
              this.props.handleImageChange(this.state.imageFile);
            },
          );
        });
    }
  };

  handleModalClose = e => {
    this.setState({ newImage: false, avatarImage: '', imageFile: [] });
  };

  handleDrop = img => {
    const image = img[0];
    image.preview = URL.createObjectURL(image);
    this.setState({
      avatarImage: image.preview,
      imageFile: image,
      newImage: true,
      fileName: image.name,
      fileType: image.type,
    });
  };

  handleZoomSlider = e => {
    this.setState({
      zoomLevel: e.target.value,
    });
  };

  render() {
    const { avatarImage, newImage, zoomLevel } = this.state;

    return (
      <React.Fragment>
        <Dropzone
          onDrop={this.handleDrop}
          disableClick
          style={{ width: '250px', height: '250px' }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <img
                className="ui small circular image"
                src={avatarImage || Avatar}
                alt="team"
              />
            </div>
          )}
        </Dropzone>

        <Modal
          size="mini"
          dimmer="blurring"
          open={newImage}
          onClose={this.handleModalClose}
          closeIcon
        >
          <Modal.Header>Edit Image</Modal.Header>
          <Modal.Content>
            <AvatarEditor
              image={avatarImage || Avatar}
              width={288}
              height={288}
              borderRadius={1000}
              scale={zoomLevel}
              ref={this.setEditorRef}
            />
            <div style={{ padding: '10px 0' }}>
              <input
                type="range"
                min={0.5}
                max={1.5}
                step={0.1}
                onChange={this.handleZoomSlider}
                value={zoomLevel}
              />
            </div>
            <Button primary onClick={this.onCrop}>
              Crop
            </Button>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ImageCropper;
