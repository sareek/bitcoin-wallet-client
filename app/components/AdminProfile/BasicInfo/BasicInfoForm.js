import React from 'react';
import ReactDropzone from 'react-dropzone';
import { Button, Form, Radio } from 'semantic-ui-react';
import InputField from 'components/common/Forms/InputField';
import DatePicker from 'components/common/DatePicker/index';
import Avatar from 'assets/images/avatar.png';
import Countries from 'components/common/countries';
// import AvatarEditor from 'react-avatar-editor';
// import ImageCropper from 'components/common/ImageCropper';

const countries = Countries.map(country => (
  <option key={country.code} value={country.name}>
    {country.name}
  </option>
));

const BasicInfoForm = ({
  date,
  focused,
  onDateChange,
  onFocusChange,
  isOutsideRange,
  user,
  avatarImage,
  handleChange,
  handleSubmit,
  handleCheckBox,
  onDrop,
  handleGenderChange,
  isLoading,
  datechange,
  parseDate,
  handlePublishDateChange,
  setEditorRef,
  onCrop,
  newImage,
  handleImageChange,
}) => (
  <Form className="form" onSubmit={handleSubmit}>
    <div className="stackable grid">
      {/* <ImageCropper
        handleImageChange={handleImageChange}
        oldImage={user?.image_name?.document_name}
      /> */}
      <div className="twelve wide column">
        <div className="field">
          <label>User Name</label>
          <input
            name="username"
            value={user.username || ''}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            name="email"
            value={user.email || ''}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Telephone No.</label>
          <input
            name="phone_number"
            value={user.phone_number || ''}
            onChange={handleChange}
          />
        </div>
        <h2>Social Media Links</h2>
        <div className="field">
          <label>Facebook</label>
          <input
            name="facebook_url"
            value={user.facebook_url || ''}
            onChange={handleChange}
          />
        </div>
        {/* <div className="field">
          <label>Twitter</label>
          <input
            name="twitter_url"
            value={user.twitter_url || ''}
            onChange={handleChange}
          />
        </div> */}
        <div className="field">
          <label>Youtube</label>
          <input
            name="instagram_url"
            value={user.instagram_url || ''}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>LinkedIn</label>
          <input
            name="linkedin_url"
            value={user.linkedin_url || ''}
            onChange={handleChange}
          />
        </div>
        <div className="card">
          <h2>Address</h2>
          <InputField
            type="text"
            label="Address Line 1"
            name="address_address_line_1"
            value={user.address_address_line_1 || ''}
            onChange={handleChange}
          />
          <InputField
            type="text"
            label="Address Line 2"
            name="address_address_line_2"
            value={user.address_address_line_2 || ''}
            onChange={handleChange}
          />
          <InputField
            type="text"
            label="City"
            name="address_city"
            value={user.address_city || ''}
            onChange={handleChange}
          />
          <InputField
            type="text"
            label="ZIP/Postal Code"
            name="address_zip_postal_code"
            value={user.address_zip_postal_code || ''}
            onChange={handleChange}
          />
          <div className="two column stackable grid">
            <div className="column">
              <InputField
                type="text"
                label="State/Province/Region"
                name="address_state_region_province"
                value={user.address_state_region_province || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <Button type="submit" loading={isLoading} disabled={isLoading}>
          Save
        </Button>
      </div>
    </div>
  </Form>
);

export default BasicInfoForm;
