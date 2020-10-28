import React from 'react';
import { Button, Header, Form, Modal, Dropdown, Popup } from 'semantic-ui-react';
import QRCode from 'qrcode.react';
import { crytoCoinsOptions } from 'utils/constants';
import copy from 'assets/images/exchange/additional/copy.svg'

const ReceiveCryptoForm = ({ hideModal, showReceiveModal, newAddress, copyToClipBoard, copiedBit }) => (
    <Modal
      size="small"
      onClose={() => hideModal(true)}
      closeOnDimmerClick= {false}
    //   onOpen={() => setOpen(true)}
      open={showReceiveModal}
      closeIcon
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>  <Header>Request Bitcoin</Header></Modal.Header>
      <Modal.Content>
        <label><b>Currency:</b></label>
        <Dropdown
            width={6}
            placeholder='Select currency'
            fluid
            selection
            options={crytoCoinsOptions}
            value={'1'}
            size="mini"
            />
            <br />
        <QRCode value={'mm7hpftYhHU8hqTxGGLawrXwGCq7i147FG'} />
        <br />
        <br />
   <Form>
   <Form.Field>
      <label>Address</label>
      <div className="ui action input">
      <input 
      className="copyInput"
        placeholder='Address...' 
        value={newAddress && newAddress.address ? newAddress.address : 'Loading...'}
        readOnly 
       />
         <Popup
          content={copiedBit ?  'copied' : 'copy'}
          on='click'
          open={copiedBit}
          trigger={ <button 
            type="button" 
            name="copyToken" 
            value="copy" 
            class="copyToken ui right icon button"
            onClick={() => copyToClipBoard(newAddress && newAddress.address)}
            >
               <img src={copy} alt="img" />
           </button>}
        />
       {/* <button 
         type="button" 
         name="copyToken" 
         value="copy" 
         class="copyToken ui right icon button"
         onClick={() => copyToClipBoard(newAddress && newAddress.address)}
         >
            <img src={copy} alt="img" />
        </button> */}
        </div>
    </Form.Field>
   </Form>
   
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Done"
          labelPosition='right'
          icon='checkmark'
          onClick={() => hideModal(true)}
          positive
        />
      </Modal.Actions>
    </Modal>
)

export default ReceiveCryptoForm;