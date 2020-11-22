import React from 'react';
import { Button, Form, Segment, Radio } from 'semantic-ui-react';
import InputField from 'components/common/Forms/InputField';
import DatePicker from 'components/common/DatePicker';
import Countries from 'components/common/countries';
import FileDropZone from 'components/FileDropZone';

const countries = Countries.map((country) =>
  (<option key={country.code} value={country.name}>
    {country.name}
  </option>)
);

const BasicInfoForm = (
  {
    date, focused, onDateChange, onFocusChange, isOutsideRange, user, avatarImage,
    handleChange, handleSubmit, handleCheckBox, onDrop, handleGenderChange, isLoading, datechange, setEditorRef, onCrop, newImage,
    handleOnDrop, handleOnDropRejected, files, handleFileRemove, errors
  }
) =>

  (<Form onSubmit={handleSubmit} className="py-2 form">
    <h2>KYC</h2>
    <div className="form__elements">

      <Segment>
      <h3>Personal Info</h3>
      <Form.Group widths="equal">
        <Form.Field>
          <label>First Name</label>
          <input name="first_name" value={user.first_name || ''} onChange={handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input name="last_name" value={user.last_name || ''} onChange={handleChange} />
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Field><label>Gender:</label></Form.Field>
        <Form.Field>
          <Radio label="Male" name="gender" value="Male" checked={(user.gender || '').toLowerCase() === 'male'}
            onChange={handleGenderChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio label="Female" name="gender" value="Female" checked={(user.gender || '').toLowerCase() === 'female'}
            onChange={handleGenderChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio label="Other" name="gender" value="Other" checked={(user.gender || '').toLowerCase() === 'other'}
            onChange={handleGenderChange}
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <label>Date of Birth: </label>
        <DatePicker datechange={datechange} date={user.birth_date || null} />
      </Form.Field>
      <Form.Group widths="equal">
        <Form.Field>
          <label>User Name</label>
          <input name="username" value={user.username || ''} onChange={handleChange} disabled />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input name="email" value={user.email || ''} onChange={handleChange} disabled />
        </Form.Field>
      </Form.Group>
      </Segment>



      <Segment>
        <h3>Address</h3>
        <Form.Group widths="equal">
          <InputField type="text" label="Address Line 1" name="address_address_line_1"
            value={user.address_address_line_1 || ''} onChange={handleChange}
          />
          <InputField type="text" label="Address Line 2" name="address_address_line_2"
            value={user.address_address_line_2 || ''} onChange={handleChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <InputField type="text" label="City" name="address_city" value={user.address_city || ''}
            onChange={handleChange}
          />
          <InputField type="text" label="State/Province/Region" name="address_state_region_province"
            value={user.address_state_region_province || ''} onChange={handleChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Country</label>
            <select className="search dropdown" name="address_country" onChange={handleChange}
              value={user.address_country || ''}
            >
              {countries}
            </select>
          </Form.Field>
          <InputField type="text" label="ZIP/Postal Code" name="address_zip_postal_code"
            value={user.address_zip_postal_code || ''} onChange={handleChange} />
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
      <div className="text-center">
      <Button type="submit" color="orange" size="large" loading={isLoading} disabled={isLoading}>Save</Button>
      </div>
    </div>
  </Form>);

export default BasicInfoForm;
