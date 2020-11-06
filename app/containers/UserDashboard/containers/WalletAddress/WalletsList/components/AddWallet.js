import React from 'react';
import { Button, Header, Form, Modal, Dropdown, Popup } from 'semantic-ui-react';
import InputField from 'components/common/Forms/InputField';

const AddWallet = ({ hideModal, showModal, handleChange, handleSubmit, data, errors }) => (
    <Modal
      size="small"
      onClose={() => hideModal(true)}
      closeOnDimmerClick= {false}
    //   onOpen={() => setOpen(true)}
      open={showModal}
      closeIcon
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header><Header>Add New Bitcoin Wallet</Header></Modal.Header>
      <Modal.Content>
        <Form>
        <Form.Field>
            <InputField
                label="Wallet Name"
                name="label"
                type="text"
                placeholder="Wallet Name..."
                value={data.label || ''}
                onChange={handleChange}
                error={errors.label ? 'Enter a value' : null}
            />
            </Form.Field>
        </Form>
   
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={handleSubmit}
          positive
        >
          Create New Wallet
        </Button>
      </Modal.Actions>
    </Modal>
)

export default AddWallet;