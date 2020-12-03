import React from 'react';
import { Button, Header, Form, Modal } from 'semantic-ui-react';

const DeleteWallet = ({ hideModal, showModal,isRequesting, handleChange, handleSubmit, data, errors, title }) => (
  <Modal
    size="tiny"
    onClose={() => hideModal(true)}
    closeOnDimmerClick={false}
    //   onOpen={() => setOpen(true)}
    open={showModal}
    closeIcon
    trigger={<Button>Show Modal</Button>}
  >
    <Header icon='delete' content={title} />
    <Modal.Content>
    <Modal.Description>
          <Header style={{color: "rgb(29 28 27)"}}>Warning!!! Do Not Archive Wallet.</Header>
      </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      <Form size="large">
        <Form.Field>
          <Button
            onClick={handleSubmit}
            color="orange"
            disabled={ isRequesting ? true : false }
          >
             {isRequesting ? "Loading..." : "Archive Wallet"}
        </Button>
        </Form.Field>
      </Form>
        </Modal.Actions>
   
   
  </Modal>
)

export default DeleteWallet;