import React from 'react';
import {capitalize} from 'utils/helper';
import {Button, Modal, Icon} from 'semantic-ui-react';

class DeleteConfirmation extends React.PureComponent {

  render() {
    const {closeClick} = this.props;
    return (
      <Modal closeOnDimmerClick={false} className="confirmed-page" dimmer="blurring" size="mini" open >
        <Modal.Header>
          Assessment submitted for analysis.      
        </Modal.Header>
        <Modal.Content>
          <span>
           It will take around 3-4 business days to prepare a detailed report of the assessment. 
           To view the report, you will need the private key to decrypt the report.
          </span>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            content="Okay"
            onClick={ closeClick }
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DeleteConfirmation;
