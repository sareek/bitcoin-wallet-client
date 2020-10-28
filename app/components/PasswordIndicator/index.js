import React from "react";
import PropTypes from 'prop-types';
import { Progress } from 'semantic-ui-react';
import passwordHelper from 'utils/passwordHelper';

const PasswordIndicator = (
  { password }
) => {
  const errors = passwordHelper(password) || {};
  const passwordStrength = 5 - Object.keys(errors).length;

  return (
    <div>
      {passwordStrength !== 0 &&
        <Progress
          percent={passwordStrength * 20}
          color={passwordStrength <=2 ? 'red' : passwordStrength <=4 ? 'olive' : 'green'}
          size="tiny"
        >{passwordStrength <=2 ? 'Weak' : passwordStrength <=4 ? 'Good' : 'Strong'}</Progress>
        }
    </div>
  );
};

PasswordIndicator.defaultProps = {
  password: ""
};

PasswordIndicator.propTypes = {
  password: PropTypes.string.isRequired
};

export default PasswordIndicator;
