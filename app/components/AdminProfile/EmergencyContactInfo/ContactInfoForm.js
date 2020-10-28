import React from 'react';
import { Form, Input, Button, Select } from 'semantic-ui-react';
// import Geosuggest from 'react-geosuggest';
import MobileInput from 'components/common/Forms/MobileInput';

// import 'assets/css/geosuggest.css';

const relationOptions = [
  { key: 'family', text: 'Family', value: 'family' },
  { key: 'friend', text: 'Friend', value: 'friend' },
];

const ContactInfoForm = (
  {
    handleSubmit, handleCancel, handleChange, handleSelectInput,
    onSuggestSelect, handleMobileChange, onMobileCountryChange,
    data, mobileNumberModified, loading, locationValChange,
    errors, setMobileNumber
  }
) => {
  const intlPhoneNumber = `${data.country_code}${data.mobile_number}`;
  return (
    <Form className="fluid mg-top-md">
      <Form.Field>
        <label>Emergency Contact Name: </label>
        <Input name="person_name" value={data.person_name} onChange={handleChange} />
        {(errors && errors.person_name) && <span data-tooltip={errors.person_name} ><i className="icon-exclamation-triangle red" /></span>}
      </Form.Field>
      <Form.Field>
        <label>Emergency Contact Email: </label>
        <Input name="email" type="email" value={data.email} onChange={handleChange} />
        {(errors && errors.email) && <span data-tooltip={errors.email} ><i className="icon-exclamation-triangle red" /></span>}
      </Form.Field>
      <Form.Field>
        <label>Mobile No.: {(errors && errors.mobile_number) &&
        <span data-tooltip={errors.mobile_number} ><i className="icon-exclamation-triangle red" /></span>}
        </label>
        <MobileInput setMobileNumber={setMobileNumber}  intlPhoneNumber={intlPhoneNumber}
                     country_abbr={data.country_abbr}
        />
      </Form.Field>
      <Form.Field>
        <label>Alternate Phone No. (optional) </label>
        <Input name="phone_number" type="tel" value={data.phone_number}
               onChange={handleChange} placeholder="Phone number with country code"
        />
        {(errors && errors.phone_number) && <span data-tooltip={errors.phone_number} ><i className="icon-exclamation-triangle red" /></span>}
      </Form.Field>
      <Form.Field>
        <label>Location: </label>
        {/* <Geosuggest id="address" className="form-control" onSuggestSelect={onSuggestSelect}
                    value={data.location.label || ""} initialValue={data.location.label || ""} onChange={locationValChange}
        /> */}
        {(errors && errors.location) && <span data-tooltip={errors.location} ><i className="icon-exclamation-triangle red" /></span>}
      </Form.Field>
      <Form.Field>
        <label>Relationship: </label>
        <Select name="relationship" compact options={relationOptions} defaultValue={data.relationship}
                onChange={handleSelectInput}
        />
      </Form.Field>
      <div>
        <Button primary onClick={handleSubmit} loading={loading} disabled={loading}>Save</Button>
        <Button basic onClick={handleCancel}>Cancel</Button>
      </div>
    </Form>);
};

export default ContactInfoForm;
