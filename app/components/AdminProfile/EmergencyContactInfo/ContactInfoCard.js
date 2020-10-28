import React from 'react';
import { Button, Card } from 'semantic-ui-react';

const ContactInfoCard = (
  {
    contact,
    handleEdit,
    handleRemove,
  }
) => (
  <Card>
    <Card.Content>
      <Card.Header>
        Name: {contact.person_name} {contact.approved && <i className="icon-check-circle" />}
      </Card.Header>
      <div className="list">
        {contact.email &&
        <div className="item">
          <i className="icon-envelope-o icon" />
          <div className="content">Email: {contact.email}</div>
        </div>}
        {contact.mobile_number &&
        <div className="item">
          <i className="icon-mobile icon" />{' '}
          <div className="content">Mobile No.: {contact.country_code}{contact.mobile_number}</div>
        </div>}
        {contact.phone_number &&
        <div className="item">
          <i className="icon-phone icon" />{' '}
          <div className="content">Phone No.: {contact.phone_number}</div>
        </div>}

        <div className="item">
          <i className="icon-globe icon" />{' '}
          <div className="content">Location: {(contact.location && contact.location.formatted_address) ? contact.location.formatted_address : ""}</div>
        </div>
        {contact.relationship &&
        <div className="item">
          <i className="icon-users icon" />
          <div className="content">
            {' '}Relationship: {contact.relationship}
          </div>
        </div>}
      </div>
    </Card.Content>
    <Card.Content extra>
      <div className="">
        <Button name={contact._id} primary onClick={handleEdit}>
          Edit
        </Button>
        <Button name={contact._id} basic onClick={handleRemove}>
          Remove
        </Button>
      </div>
    </Card.Content>
  </Card>
);

export default ContactInfoCard;
