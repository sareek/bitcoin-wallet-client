import React from 'react';
import Dropzone from 'react-dropzone';

import InputField from 'components/common/Forms/InputField';
import { Button, Form } from 'semantic-ui-react';
import Preview from './Preview';
import Countries from 'components/common/countries';

const countries = Countries.map((country) =>
  (<option key={country.code} value={country.name}>
    {country.name}
  </option>)
);

const BankAccountForm = (props) =>
  (<div className="mg-top-md">
    <h1>Enter Bank Details</h1>
    <Form className="form bank-account-form" onSubmit={props.handleSubmit}>
      <InputField
        type="text"
        label="Account Holder Name"
        name="account_holder_name"
        error={props.errors.account_holder_name}
        value={props.value.account_holder_name}
        onChange={props.handleChange}
      />
      <InputField
        type="text"
        label="Bank Name"
        name="bank_name"
        value={props.value.bank_name}
        error={props.errors.bank_name}
        onChange={props.handleChange}
      />
      <InputField
        type="text"
        label="Account Number"
        name="bank_account_number"
        value={props.value.bank_account_number}
        error={props.errors.bank_account_number}
        onChange={props.handleChange}
      />
      <InputField
        type="text"
        label="Swift Code"
        name="swift_code"
        value={props.value.swift_code}
        error={props.errors.swift_code}
        onChange={props.handleChange}
      />
      <div className={props.errors.bank_account_type ? "error field" : "field"}>
        <label htmlFor={`${props.value.bank_account_type}`}>Account Type</label>
        <select
          className="dropdown"
          onChange={props.handleAccountType}
          value={
            props.value && props.value.bank_account_type
              ? props.value.bank_account_type
              : ''
          }
        >
          <option value="">Select Account Type</option>
          <option value="savings_account">Savings Account</option>
          <option value="current_account">Current / Checking Account</option>
        </select>
        {props.errors.bank_account_type && <span data-tooltip={props.errors.bank_account_type}><i className="icon-exclamation-triangle red" /></span>}
          </div>
      <InputField
        type="text"
        label="Routing Number (optional)"
        name="routing_number"
        value={props.value.routing_number}
        onChange={props.handleChange}
      />
      <InputField
        type="text"
        label="IFSC / IBAN Code (optional)"
        name="iban_ifsc_code"
        value={props.value.iban_ifsc_code}
        onChange={props.handleChange}
      />
      <InputField
        type="text"
        label="Bank Branch Address"
        name="bank_branch_address"
        value={props.value.bank_branch_address}
        error={props.errors.bank_branch_address}
        onChange={props.handleChange}
      />
      <div className="card">
        <h2>Billing Address</h2>

        <InputField
          type="text"
          label="Address Line 1"
          name="billing_address_address_line_1"
          value={props.value.billing_address_address_line_1}
          error={props.errors.billing_address_address_line_1}
          onChange={props.handleChange}
        />
        <p className="faded">Street Address, P.O. box, company name, c/o</p>
        <InputField
          type="text"
          label="Address Line 2(optional)"
          name="billing_address_address_line_2"
          value={props.value.billing_address_address_line_2}
          onChange={props.handleChange}
        />
        <p className="faded">Apartment, suite, unit buidling, floor, etc</p>

        <InputField
          type="text"
          label="City"
          name="billing_address_city"
          value={props.value.billing_address_city}
          error={props.errors.billing_address_city}
          onChange={props.handleChange}
        />

        <InputField
          type="text"
          label="ZIP/Postal Code"
          name="billing_address_zip_postal_code"
          value={props.value.billing_address_zip_postal_code}
          error={props.errors.billing_address_zip_postal_code}
          onChange={props.handleChange}
        />

        <div className="two column grid">
          <div className="column">
            <InputField
              type="text"
              label="State /Province/Region"
              name="billing_address_state_region_province"
              value={props.value.billing_address_state_region_province}
              error={props.errors.billing_address_state_region_province}
              onChange={props.handleChange}
            />
          </div>

          <div className="column">
            <div className={props.errors.billing_address_country ? "error field" : "field"}>
              <label>Country</label>
              <select
                className="search dropdown"
                name="billing_address_country"
                onChange={props.handleChange}
                value={props.value && props.value.billing_address_country}
              >
                {countries}
              </select>
              {props.errors.billing_address_country && <span data-tooltip={props.errors.billing_address_country}><i className="icon-exclamation-triangle red" /></span>}
            </div>
          </div>
        </div>
      </div>

      <div className="mg-top-sm">
        <label>Goverment Issued photo ID (e.g. Passport, Driving License or State ID)</label>
          <div className="message info"><i className="icon-info-o"/>Maximum 4 files can be uploaded</div>

      </div>
      <Dropzone
        className="dropzone"
        onDrop={props.onDrop}
        multiple
        accept=".jpg, .jpeg, .png"
        disabled={props.dropzoneDisabled}
        disablePreview={props.dropzoneDisabled}
        disableClick={props.dropzoneDisabled}
      >
        <span className={props.dropzoneDisabled ? "btn btn-red" : "btn btn-link"}>{props.dropzoneDisabled ? "Limit of maximum of 4 uploaded files exceeded" : "Upload"} {' '}</span>
      </Dropzone>
      {((props.file && props.file.length > 0) ||
        (props.document && props.document.size > 0)) &&
        <Preview
          image_name={props.file && props.file}
          document={props.document && props.document}
          document_type={props.value.doc_types}
          document_path={props.file.document_path && props.value.document_path}
          handleToggleOption={props.handleToggleOption}
          deleteRow={props.deleteRow}
        />}
      {!props.form_valid &&
        <div className="message info">
          <strong>Please select all the uploaded document types.</strong>
        </div>}
      <Button
        type="submit"
        className="button primary"
        loading={props.isRequesting}
        disabled={props.isRequesting || !props.form_valid}
      >
        Submit
      </Button>
    </Form>
  </div>);

export default BankAccountForm;
