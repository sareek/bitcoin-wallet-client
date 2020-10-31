import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import InputField from 'components/common/Forms/InputField';
import PasswordInputField from 'components/common/Forms/PasswordInputField';
import { Link } from 'react-router-dom';
import Captcha from 'components/Captcha';

const LoginForm = ({
  data,
  errors,
  requesting,
  handleSubmit,
  handleChange,
  showForgotPasswordForm,
  onRecaptchaChange,
}) => (
  <Form style={{padding: '4rem', margin: '0 auto'}} onSubmit={handleSubmit}>
    <Form.Field style={{margin: '0 auto 2rem auto'}} width={12}>
      <InputField
        label="Email ID"
        name="email"
        type="text"
        placeholder="Email"
        value={data.email || ''}
        onChange={handleChange}
        error={errors.email ? 'username_error' : null}
      />
    </Form.Field>
    <Form.Field style={{margin: '0 auto 2rem auto'}} width={12}>
    <PasswordInputField
      placeholder="Password"
      password={data.password || ''}
      onChange={handleChange}
      error={errors.password ? 'password_error' : null}
    />
    </Form.Field>

      <Form.Field style={{margin: '0 auto 2rem auto'}} width={12}>
    <Button
      style={{margin: '0 auto 2rem auto'}}
      color="blue"
      fluid
      type="submit"
      loading={requesting}
      disabled={requesting}
    >
      Login
    </Button>
    </Form.Field>
    <Form.Field>
      <p style={{textAlign: 'center', marginTop: '2rem'}}>
          Not a Member? <Link to="/register">Register</Link>
      </p>
      </Form.Field>
  </Form>
);
export default LoginForm;
