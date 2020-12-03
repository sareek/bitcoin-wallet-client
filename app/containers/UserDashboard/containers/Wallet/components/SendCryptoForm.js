import React from 'react';
import { Button, Header, Form, Modal, Dropdown, Popup, Message, TextArea } from 'semantic-ui-react';
import QRCode from 'qrcode.react';
import { crytoCoinsOptions } from 'utils/constants';
import copy from 'assets/images/exchange/additional/copy.svg'

const SendCryptoForm = ({
    hideModal,
    showSendModal,
    data,
    handleChange,
    submitSendAddress,
    handleDropDown,
    walletOptions,
    btcPrice,
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
            {console.log(walletOptions)}
            <Header icon='send' content='Send Wallet Address' />
            <Modal.Content>
                <Form size="large">
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Send From:</label>
                            <div className="ui action input">
                                <Dropdown
                                    width={6}
                                    search
                                    name="selectedAddress"
                                    placeholder='Select address'
                                    fluid
                                    selection
                                    options={walletOptions}
                                    onChange={handleDropDown}
                                />
                            </div>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Address</label>
                            <input
                                name="sendAddress"
                                placeholder="Address"
                                value={data.sendAddress || ''}
                                onChange={handleChange}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths="equal">
                        {btcPrice && (
                               <Form.Field>
                               <label>Amount</label>
                               <input
                                   name="amount"
                                   placeholder="Amount"
                                   value={data.amount || ''}
                                   onChange={handleChange}
                               />
                           </Form.Field>
                        )}
                     
                        <Form.Field>
                            <label>BTC</label>
                            <input
                                name="btc_amount"
                                placeholder="Amount in BTC"
                                value={data.btc_amount || ''}
                                onChange={handleChange}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field>
                          <TextArea className="textarea-description" placeholder='Description (Optional)' />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                    <Form.Field>
                       <span className="text-muted">Estimated confirmation time 1+ hour</span>
                    </Form.Field>
                    </Form.Group>
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