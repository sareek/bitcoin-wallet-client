import React from 'react';
import { Button, Form, Segment, Radio, Dropdown } from 'semantic-ui-react';
import InputField from 'components/common/Forms/InputField';
import Countries from 'components/common/countries';
import FileDropZone from 'components/FileDropZone';
import { birthYearOption, birthMonthOption, birthDayOption } from 'utils/constants';

const countriesOption = Countries.map((country, index) => {
  return {
    key: index + 1,
    text: country.name,
    value: country.name
  }
});

const BasicInfoForm = (
  {
    handleDropDown,
    user,
    handleChange, 
    handleSubmit, 
    handleGenderChange, 
    isLoading,
    handleOnDrop, 
    handleOnDropRejected, 
    files, 
    handleFileRemove, 
    errors
  }
) =>
  (<Form onSubmit={handleSubmit} className="py-2 form">
 
    <div className="form__elements">
      <Segment>
        <h3>Personal Info</h3>
        <Form.Group widths="equal">
          <Form.Field>
            <label>First Name</label>
            <input
              name="first_name"
              placeholder="First Name"
              value={user.first_name || ''}
              onChange={handleChange}
            />
             {errors.first_name && (
              <span style={{ color: 'red' }}>{errors.first_name}</span>
            )}
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input
              name="last_name"
              placeholder="Last Name"
              value={user.last_name || ''}
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field><label>Gender:</label></Form.Field>
          <Form.Field>
            <Radio
              label="Male"
              name="gender"
              value="Male"
              checked={(user.gender || '').toLowerCase() === 'male'}
              onChange={handleGenderChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Female"
              name="gender"
              value="Female"
              checked={(user.gender || '').toLowerCase() === 'female'}
              onChange={handleGenderChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Other"
              name="gender"
              value="Other"
              checked={(user.gender || '').toLowerCase() === 'other'}
              onChange={handleGenderChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Birth Year:</label>
            <Dropdown
              placeholder='Select Birth Year'
              name="birthYear"
              search
              selection
              options={birthYearOption}
              onChange={handleDropDown}
            />
          </Form.Field>
          <Form.Field>
            <label>Birth Month:</label>
            <Dropdown
              placeholder='Select Birth Month'
              name="birthMonth"
              search
              selection
              options={birthMonthOption}
              onChange={handleDropDown}
            />
          </Form.Field>
          <Form.Field>
            <label>Birth Day:</label>
            <Dropdown
              placeholder='Select Birth Day'
              name="birthDay"
              search
              selection
              options={birthDayOption}
              onChange={handleDropDown}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>User Name</label>
            <input
              name="username"
              placeholder="User Name"
              value={user.username || ''}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              name="email"
              placeholder="Email"
              value={user.email || ''}
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>
      </Segment>
      <Segment>
        <h3>Address</h3>
        <Form.Group widths="equal">
          <InputField
            type="text"
            label="Address Line 1"
            placeholder="Address Line 1"
            name="address_address_line_1"
            value={user.address_address_line_1 || ''}
            onChange={handleChange}
          />
          <InputField
            type="text"
            label="Address Line 2"
            placeholder="Address Line 2"
            name="address_address_line_2"
            value={user.address_address_line_2 || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <InputField
            type="text"
            label="City"
            placeholder="City"
            name="address_city"
            value={user.address_city || ''}
            onChange={handleChange}
          />
          <InputField
            type="text"
            label="State/Province/Region"
            placeholder="State/Province/Region"
            name="address_state_region_province"
            value={user.address_state_region_province || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Country:</label>
            <Dropdown
              placeholder='Select a Country'
              search
              selection
              options={countriesOption}
              onChange={handleDropDown}
            />
          </Form.Field>
          <InputField
            type="text"
            label="ZIP/Postal Code"
            placeholder='ZIP/Postal Code'
            name="address_zip_postal_code"
            value={user.address_zip_postal_code || ''}
            onChange={handleChange}
          />
        </Form.Group>
      </Segment>
      <Segment>
        <div>
          <h5>Upload a File</h5>
          <FileDropZone
            files={files}
            // errors={errors}
            handleOnDrop={handleOnDrop}
            handleOnDropRejected={handleOnDropRejected}
            handleFileRemove={handleFileRemove}
            fileName="kycFile"
          />
        </div>
      </Segment>
      <div style={{ textAlign: "center" }}>
        <Button
          style={{ width: '150px', borderRadius: "50px" }}
          size="big"
          type="submit"
          color="orange"
          loading={isLoading}
          disabled={isLoading}>
          Save
        </Button>
      </div>
    </div>
  </Form>);

export default BasicInfoForm;
