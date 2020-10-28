import React from 'react'
import {Icon,Button,Modal,Header} from "semantic-ui-react";
import SortableComponent from './index';
const a=5;
const Modals = (props) => {
    return (
      <Modal open>
      <Modal.Header>Order</Modal.Header>
      <Modal.Content>
  <SortableComponent getItems={props.getItems()} items={props.items || []} />
      </Modal.Content>
      <Modal.Actions>
              <Button onClick={()=>props.closeModal()} negative>
                Close
              </Button>
              <Button onClick={(a)=>props.closeModal(a)}>Save</Button>
              </Modal.Actions>
    </Modal>
    
    );
  };

export default Modals