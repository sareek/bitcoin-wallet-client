/*
  Created by: ui_monkey 11/11/2020
 */
import React from 'react';
import { Form, Button, Icon, Message, Image } from 'semantic-ui-react';
import Captcha from 'components/Captcha';
import PasswordInputField from 'components/common/Forms/PasswordInputField';
import FormField from 'components/common/Forms/FormField';
import PasswordIndicator from 'components/PasswordIndicator';
import { Link } from 'react-router-dom';
import Logo from "../../../assets/Btcwallet_logo/Version 1/Btcwallet_logo-01.png";

const UserRegistrationForm = (
  {
    handleSubmit,
    handleChange,
    data,
    errors,
    isRequesting,
    errorResponse
  }) => {
  return (
    <div className="login__box " >
      
      <div className="login__logo">
        <Link to="/">
              <Image
                // spaced="bottom"
                src={Logo}
                alt="XAL"
                centered
              />
          </Link>
            </div>
            <p className="title">Create free account</p> 
      {errorResponse && (
          <div className="invalid_cred_msg">
          <Message negative icon>
            <Icon name="warning circle" />
            <Message.Content>
              <Message.Header>Error !</Message.Header>
              <p>{errorResponse}</p>
            </Message.Content>
          </Message>
          </div>
      )}
    <Form  onSubmit={handleSubmit}>
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
          <Button className="button" color="purple"  fluid type="submit"
            loading={isRequesting}>Register</Button>
      </div>

    </Form>

    {window.location.pathname.split('/')[1] != 'guest-detail' && (
          <p style={{textAlign: 'center', marginTop: '2rem'}}>
            Already a Member? <Link to="/login">Login</Link>
          </p>
        )}
    </div>
  )
};

export default UserRegistrationForm;
