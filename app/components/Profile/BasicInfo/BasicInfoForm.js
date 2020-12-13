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
             {errors.last_name && (
              <span style={{ color: 'red' }}>{errors.last_name}</span>
            )}
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
          {errors.gender && (
              <span style={{ color: 'red' }}>{errors.gender}</span>
            )}
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Birth Year:</label>
            <Dropdown
              placeholder='Select Birth Year'
              name="dob_year"
              search
              selection
              options={birthYearOption}
              onChange={handleDropDown}
            />
            {errors.dob_year && (
              <span style={{ color: 'red' }}>{errors.dob_year}</span>
            )}
          </Form.Field>
          <Form.Field>
            <label>Birth Month:</label>
            <Dropdown
              placeholder='Select Birth Month'
              name="dob_month"
              search
              selection
              options={birthMonthOption}
              onChange={handleDropDown}
            />
            {errors.dob_month && (
              <span style={{ color: 'red' }}>{errors.dob_month}</span>
            )}
          </Form.Field>
          <Form.Field>
            <label>Birth Day:</label>
            <Dropdown
              placeholder='Select Birth Day'
              name="dob_date"
              search
              selection
              options={birthDayOption}
              onChange={handleDropDown}
            />
            {errors.dob_date && (
              <span style={{ color: 'red' }}>{errors.dob_date}</span>
            )}
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
            {errors.username && (
              <span style={{ color: 'red' }}>{errors.username}</span>
            )}
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              name="email"
              placeholder="Email"
              value={user.email || ''}
              onChange={handleChange}
            />
            {errors.email && (
              <span style={{ color: 'red' }}>{errors.email}</span>
            )}
          </Form.Field>
        </Form.Group>
      </Segment>
      <Segment>
        <h3>Address</h3>
        <Form.Group widths="equal">
          <Form.Field>
            <InputField
              type="text"
              label="Address Line 1"
              placeholder="Address Line 1"
              name="address1"
              value={user.address1 || ''}
              onChange={handleChange}
            />
            {errors.address1 && (
              <span style={{ color: 'red' }}>{errors.address1}</span>
            )}
          </Form.Field>
          <Form.Field>
            <InputField
              type="text"
              label="Address Line 2"
              placeholder="Address Line 2"
              name="address2"
              value={user.address2 || ''}
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <InputField
              type="text"
              label="City"
              placeholder="City"
              name="city"
              value={user.city || ''}
              onChange={handleChange}
            />
            {errors.city && (
              <span style={{ color: 'red' }}>{errors.city}</span>
            )}
          </Form.Field>
          <Form.Field>
            <InputField
              type="text"
              label="State/Province/Region"
              placeholder="State/Province/Region"
              name="state"
              value={user.state || ''}
              onChange={handleChange}
            />
            {errors.state && (
              <span style={{ color: 'red' }}>{errors.state}</span>
            )}
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Country:</label>
            <Dropdown
              placeholder='Select a Country'
              name="country"
              search
              selection
              options={countriesOption}
              onChange={handleDropDown}
            />
            {errors.country && (
              <span style={{ color: 'red' }}>{errors.country}</span>
            )}
          </Form.Field>
          <Form.Field>
            <InputField
              type="text"
              label="ZIP/Postal Code"
              placeholder='ZIP/Postal Code'
              name="zip"
              value={user.zip || ''}
              onChange={handleChange}
            />
            {errors.zip && (
              <span style={{ color: 'red' }}>{errors.zip}</span>
           )}
          </Form.Field>
        </Form.Group>
      </Segment>
      <Segment>
        <div>
          <h5>Upload a File</h5>
          <FileDropZone
            files={files}
            errors={errors}
            handleOnDrop={handleOnDrop}
            handleOnDropRejected={handleOnDropRejected}
            handleFileRemove={handleFileRemove}
            fileName="kycFile"
          />
          {errors.kycFile && (
              <span style={{ color: 'red' }}>{errors.kycFile}</span>
           )}
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
