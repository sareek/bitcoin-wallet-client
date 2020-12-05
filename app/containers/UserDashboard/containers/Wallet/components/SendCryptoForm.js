import React from 'react';
import { Button, Header, Form, Modal, Dropdown, TextArea } from 'semantic-ui-react';

const SendCryptoForm = ({
    hideModal,
    showSendModal,
    data,
    errors,
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
                                    name="from_address"
                                    placeholder='Select address'
                                    fluid
                                    selection
                                    options={typeof walletOptions !== 'string' ? walletOptions : []}
                                    onChange={handleDropDown}
                                />
                            </div>
                            {errors.from_address && (
                                <span style={{ color: 'red' }}>{errors.from_address}</span>
                                )}
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>To Address</label>
                            <input
                                name="to_address"
                                placeholder="Address"
                                value={data.to_address || ''}
                                onChange={handleChange}
                            />
                            {errors.to_address && (
                            <span style={{ color: 'red' }}>{errors.to_address}</span>
                            )}
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        {btcPrice && (
                            <Form.Field>
                                <label>Amount ($)</label>
                                <input
                                    type="number"
                                    name="usd_amount"
                                    placeholder="Amount in USD"
                                    value={data.usd_amount || ''}
                                    onChange={handleChange}
                                />
                            </Form.Field>
                        )}
                        <Form.Field>
                            <label>BTC</label>
                            <input
                                type="number"
                                name="btc_amount"
                                placeholder="Amount in BTC"
                                value={data.btc_amount || ''}
                                onChange={handleChange}
                            />
                             {errors.btc_amount && (
                                <span style={{ color: 'red' }}>{errors.btc_amount}</span>
                                )}
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <TextArea
                                className="textarea-description"
                                placeholder='Description (Optional)'
                                name="description"
                                value={data.description || ''}
                                onChange={handleChange}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field>
                            <span className="text-muted">Estimated confirmation time 1+ hour</span>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <Button
                            content="Send"
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