import React from 'react';
import PropTypes from 'prop-types';

const localeText = {
  ne: {
    text: 'ने',
  },
  en: {
    text: 'EN',
  },
};

const Toggle = props => {
  let content = null;
  if (props.value) {
    content = props.values.map(value => (
      <span
        key={`opt-${value}`}
        className={props.value === value ? 'lang active' : 'lang'}
        onClick={() => props.onToggle({ target: { value } })}
      >
        {localeText[value].text}
      </span>
    ));
  }

  return <div className="language">{content}</div>;
};

Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
