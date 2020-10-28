import React from 'react';
import SignupForm from './SignupForm';
import './assets/style.scss';

const Register = (props) => (
  <>
   <SignupForm className="signup__wrap" {...props}/>
  </>
);

export default Register;
