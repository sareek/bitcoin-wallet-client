import React from 'react';
import { Button, Header, Form, Modal, Dropdown, Popup } from 'semantic-ui-react';
import QRCode from 'qrcode.react';
import { crytoCoinsOptions } from 'utils/constants';
import copy from 'assets/images/exchange/additional/copy.svg'

const ReceiveCryptoForm = ({ hideModal, showReceiveModal, newAddress, copyToClipBoard, copiedBit }) => (
  <Modal
    size="tiny"
    onClose={() => hideModal(true)}
    closeOnDimmerClick={false}
    //   onOpen={() => setOpen(true)}
    open={showReceiveModal}
    closeIcon
    trigger={<Button>Show Modal</Button>}
  >
    <Header icon='download' content='Request Bitcoin' />

    <Modal.Content>
      <Form size="large">
        <Form.Field>
          <label>Currency:</label>
          <Dropdown
            width={6}
            placeholder='Select currency'
            fluid
            selection
            options={crytoCoinsOptions}
            value={'1'}
          />


        </Form.Field>
        <Form.Field className="qr"><QRCode value={'mm7hpftYhHU8hqTxGGLawrXwGCq7i147FG'} /></Form.Field>
        <Form.Field>
          <label>Address:</label>
          <div className="ui action input">
            <input
              className="copyInput"
              placeholder='Address...'
              value={newAddress && newAddress.address ? newAddress.address : 'Loading...'}
              readOnly
            />
            <Popup
              content={copiedBit ? 'copied' : 'copy'}
              on='click'
              open={copiedBit}
              trigger={<button
                type="button"
                name="copyToken"
                value="copy"
                className="copyToken ui right icon button"
                onClick={() => copyToClipBoard(newAddress && newAddress.address)}
              >
                <i class="copy icon"></i>
              </button>}
            />

          </div>
        </Form.Field>
        <Form.Field>
          <Button
            content="Done"
            fluid
            onClick={() => hideModal(true)}
            color="blue"
          />
          </Form.Field>
      </Form>

    </Modal.Content>



  </Modal>
)

export default ReceiveCryptoForm;