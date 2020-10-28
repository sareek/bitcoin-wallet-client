import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

const WarningModal = props => (
  <Modal open>
    <Modal.Header>
      You only Attempt {props.attempt} out of {props.total} Questions
    </Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <p>You Want To Continue ?</p>
        <Button onClick={e => props.handleWarning(e, 'yes')}>Yes</Button>
        <Button onClick={e => props.handleWarning(e, 'no')}>No</Button>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default WarningModal;
