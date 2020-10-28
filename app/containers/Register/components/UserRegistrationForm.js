/**
 * Created by lakhe on 7/5/17.
 */
import React from 'react';
import { Form, Dropdown, Button, Icon } from 'semantic-ui-react';
import Captcha from 'components/Captcha';
import PasswordInputField from 'components/common/Forms/PasswordInputField';
import FormField from 'components/common/Forms/FormField';
import PasswordIndicator from 'components/PasswordIndicator';
import { Link } from 'react-router-dom';

const UserRegistrationForm = (
  {
    handleSubmit,
    handleSemanticChange,
    handleChange,
    data,
    errors,
    handleCheckbox,
    onRecaptchaChange,
    isRequesting,
    prefixes,
    referCode,
    handleBlur
  }) => {
  return (
    <div className="register__box" style={{padding: '30px'}}>
    <Form style={{padding: '30px'}} onSubmit={handleSubmit}>
        <FormField 
          label="Username" name="username" value={data.username || ''} onChange={handleChange}
          placeholder="Username" error={errors.username}
        />
      <FormField
        label="Email" name="email" type="email" value={data.email || ''} onChange={handleChange}
        placeholder="Email" error={errors.email}
      />
      <div className="pos-rel">{/* check error case */}
        <PasswordInputField password={data.password || ''} placeholder="Password"
          onChange={handleChange} error={errors.password}
        />
      </div>
      <div className="field">
          <Button className="button primary large full-width" type="submit"
            loading={isRequesting}>Register</Button>
      </div>

    </Form>
    <br />
    {window.location.pathname.split('/')[1] != 'guest-detail' && (
          <p style={{paddingLeft: '30px'}}>
            Already a Member? <Link to="/">Login</Link>
          </p>
        )}
    </div>
  )
};

export default UserRegistrationForm;
