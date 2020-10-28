import React from 'react';
import { Form, Button, Checkbox, Dropdown, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const ReferErrorPage = props => {
  const { message }= props

  return (
    <div>
        {message}
        <Link to='/'>Home</Link>
    </div>
  );
};

export default ReferErrorPage;
