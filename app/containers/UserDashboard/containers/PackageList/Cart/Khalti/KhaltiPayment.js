import React from 'react';
// import { Button } from 'semantic-ui-react';
import * as KhaltiCheckout from 'khalti-web';

const Khalti = props => {
  const {
    productIdentity,
    productName,
    productUrl,
    amount,
    handleClose,
    handleVerify,
  } = props;
  let config = {
    // replace this key with yours
    publicKey: 'test_public_key_8c28ed00c23e412b8960c4834683277f',
    productIdentity: productIdentity,
    productName: productName,
    productUrl: productUrl,
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        handleVerify(payload);
      },
      // onError handler is optional
      onError(error) {
        // handle errors
      },
      onClose() {
        handleClose();
      },
    },
  };
  let checkout = new KhaltiCheckout(config);
  checkout.show({ amount: amount });
  return <div />;
};

export default Khalti;
