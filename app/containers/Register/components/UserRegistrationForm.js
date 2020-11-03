/**
 * Created by lakhe on 7/5/17.
 */
import React from 'react';
import { Form, Button, Icon, Message, Image } from 'semantic-ui-react';
import Captcha from 'components/Captcha';
import PasswordInputField from 'components/common/Forms/PasswordInputField';
import FormField from 'components/common/Forms/FormField';
import PasswordIndicator from 'components/PasswordIndicator';
import { Link } from 'react-router-dom';
// import Logo from '../../assets/images/exchange/Auxledger_Logo_Favicon.png';
import Logo from "../../../assets/images/exchange/Auxledger_Logo_Favicon.png";

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
              <Image
                // spaced="bottom"
                size="small"
                src={Logo}
                alt="XAL"
                centered
              />
            </div>
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
          <Button className="button primary  "  fluid type="submit"
            loading={isRequesting}>Register</Button>
      </div>

    </Form>

    {window.location.pathname.split('/')[1] != 'guest-detail' && (
          <p style={{textAlign: 'center', marginTop: '2rem'}}>
            Already a Member? <Link to="/">Login</Link>
          </p>
        )}
    </div>
  )
};

export default UserRegistrationForm;
