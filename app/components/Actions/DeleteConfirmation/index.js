import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';

class DeleteConfirmation extends Component {
  state = { open: this.props.show };

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };

  close = deleteId => {
    this.props.showHide(deleteId);
  };

  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state;


    return (
      <Modal
        open
        closeOnDimmerClick={closeOnDimmerClick}
        onClose={() => this.close('')}
        size="mini"
      >
        <Modal.Header>Delete</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => this.close('')} negative>
            <i className="icon icon-x-circle" /> No
          </Button>
          <Button onClick={() => this.close(this.props.deleteId)} positive>
            <i name="icon-check-circle" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DeleteConfirmation;
