import React from 'react';
import { Button, Header, Form, Modal, Dropdown, Popup, Message } from 'semantic-ui-react';
import QRCode from 'qrcode.react';
import { crytoCoinsOptions } from 'utils/constants';
import copy from 'assets/images/exchange/additional/copy.svg'

const SendCryptoForm = ({
    hideModal,
    showSendModal,
    data,
    handleChange,
    submitSendAddress,
    sendWalletAddressesRequesting
}) => (
        <Modal
            size="tiny"
            onClose={() => hideModal(true)}
            closeOnDimmerClick={false}
            open={showSendModal}
            closeIcon
            trigger={<Button>Show Modal</Button>}
        >
            <Header icon='send' content='Archive Address' />
            <Modal.Content>
                <Form size="large">
                    <Form.Field>
                        <label>Address</label>
                        <input
                            name="sendAddress"
                            value={data.sendAddress || ''}
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button
                            content="Done"
                            fluid
                            onClick={() => submitSendAddress()}
                            color="orange"
                        />
                    </Form.Field>
                </Form>

            </Modal.Content>



        </Modal>
    )

export default SendCryptoForm;