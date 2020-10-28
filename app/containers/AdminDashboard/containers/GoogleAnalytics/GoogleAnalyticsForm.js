import React from 'react';
import { Form, Button, TextArea } from 'semantic-ui-react';
import InputField from 'components/common/Forms/InputField';

const GoogleAnalyticsForm = props => {
  const { data, errors, handleSubmit, handleChange } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <InputField
        type="text"
        name="view_id"
        label="Google Analytics View ID"
        value={data.view_id || ''}
        onChange={handleChange}
      />
      {errors.view_id && <span style={{ color: 'red' }}>{errors.view_id}</span>}

      <InputField
        type="text"
        name="client_email"
        label="Client Email"
        value={data.client_email || ''}
        onChange={handleChange}
      />
      {errors.client_email && (
        <span style={{ color: 'red' }}>{errors.client_email}</span>
      )}
      <Form.Field>
        <label>Private Key</label>
        <TextArea
          type="text"
          name="private_key"
          value={data.private_key || ''}
          onChange={handleChange}
          rows={8}
        />
        {errors.private_key && (
          <span style={{ color: 'red' }}>{errors.private_key}</span>
        )}
      </Form.Field>
      <Button
        className="button primary"
        loading={props.isRequesting}
        disabled={props.isRequesting}
      >
        Submit
      </Button>
    </Form>
  );
};

export default GoogleAnalyticsForm;
