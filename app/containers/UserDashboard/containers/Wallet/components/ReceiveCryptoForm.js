import React from 'react';
import { Button, Header, Form, Modal, Dropdown, Popup, Message } from 'semantic-ui-react';
import QRCode from 'qrcode.react';
import { crytoCoinsOptions } from 'utils/constants';
import copy from 'assets/images/exchange/additional/copy.svg'

const ReceiveCryptoForm = ({
  hideModal,
  showReceiveModal,
  walletOptions,
  handleDropDown,
  data,
  copyToClipBoard,
  copiedBit,
  getWalletAddressesRequesting
}) => (
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
          {!getWalletAddressesRequesting ? (
            <>
              {walletOptions && walletOptions.length > 0 ? (
                <>
                <Form.Field>
                  <label>Receive To:</label>
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
                    {/* {data && data.selectedAddress && (
                      <Popup
                        content={copiedBit ? 'copied' : 'copy'}
                        on='click'
                        open={copiedBit}
                        trigger={<button
                          type="button"
                          name="copyToken"
                          value="copy"
                          className="copyToken ui right icon button"
                          onClick={() => copyToClipBoard(data.selectedAddress)}
                        >
                          <i className="copy icon"></i>
                        </button>}
                      />
                    )} */}
                  </div>
                </Form.Field>
                {data && data.selectedAddress && (
                  <Form.Field>
                  <label>Address:</label>
                  <div className="ui action input">
                    <input
                      className="copyInput"
                      placeholder='Address...'
                      value={data && data.selectedAddress ? data.selectedAddress : ''}
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
                        onClick={() => copyToClipBoard(data.selectedAddress)}
                      >
                        <i className="copy icon"></i>
                      </button>}
                    />
                  </div>
                </Form.Field>
                )}
                </>
              ) : (
                  <Form.Field>
                    <Message info>
                      <Message.Header>Wallet Not Present</Message.Header>
                      <p>Please create a wallet address first.</p>
                    </Message>
                  </Form.Field>
                )}
            </>
          ) : (
              <Form.Field>
                <div className="loader_wallet"></div>
              </Form.Field>
            )}
          <Form.Field>
            <Button
              content="Done"
              fluid
              onClick={() => hideModal(true)}
              color="orange"
            />
          </Form.Field>
        </Form>

      </Modal.Content>



    </Modal>
  )

export default ReceiveCryptoForm;