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
  <Form  onSubmit={handleSubmit}>
    <Form.Field  >
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
    <Form.Field >
    <PasswordInputField
      placeholder="Password"
      password={data.password || ''}
      onChange={handleChange}
      error={errors.password ? 'password_error' : null}
    />
    </Form.Field>

      <Form.Field >
    <Button
  
      color="purple"
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
