import React from 'react';
import PropTypes from 'prop-types';
import { Button, Radio, Message } from 'semantic-ui-react';
import { createStructuredSelector } from 'reselect';
import Phone, {
  isValidPhoneNumber,
  formatPhoneNumber,
  parsePhoneNumber,
} from 'react-phone-number-input';
import Dropzone from 'react-dropzone';
// import rrui from 'react-phone-number-input/rrui.css';
// import rpni from 'react-phone-number-input/style.css';
// import InputField from 'components/common/Forms/InputField';
import FormField from 'components/common/Forms/FormField';

const generateRandomId = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4()}${s4()}`;
};

class SupportForm extends React.Component {
  state = {
    data: {
     // support_language: 'EN',
      support_severity: 'general_guidance',
      //contact_method: '',
      name: `${this.props.user.get('first_name')} ${this.props.user.get(
        'last_name'
      )}`,
      account_id: this.props.user.get('_id'),
      subject: ''
    },
    mobile: {
      country_code: '',
      country_abbr: '',
      mobile_number: '',
    },
    numberModified: false,
    attachments: [],
    document_titles: [],
    emails: [],
    errors: {}
  };

  getCommmaSeparatedEmails = () => {
    let emailList = '';
    this.state.emails.map((email, index) => {
      emailList += index === 0 ? email.data : `,${email.data}`;
    });
    return emailList;
  };

  validate = () => {
    const errors = {};
    const { data, mobile, emails } = this.state;
    if (!data.support_type) errors.support_type = "Support type Can't be blank";
    if (!data.subject) errors.subject = "Subject Can't be blank";
    // if (!data.support_language) errors.support_language = "Support language Can't be blank";
    if (!data.support_severity) errors.support_severity = "Support severity Can't be blank";
    if (!data.message) errors.message = "Message Can't be blank";
    // if (!data.contact_method) errors.contact_method = "Contact Method can't be blank";
    // if(data.contact_method && data.contact_method === 'CALL'){
    //   if (mobile && mobile.mobile_number==="") errors.mobile_number = "Please enter mobile number";
    // }
    // check for valid emails with regex
    // emails.forEach(email => {
    //   if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.data)) errors[email.id] = 'Invalid email';
    // });
    return errors;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { data, mobile, attachments, document_titles } = this.state;
    const errors = this.validate();
    this.setState({ errors });
    
    if (Object.keys(errors).length === 0) {
      this.setState({ data: {
          ...this.state.data,
          attachments,
          document_titles,
        } }, () => {
          this.props.submitSupportRequest(this.state.data);
        }
      );
      // }
    }
  };

  handleChange = e =>
    this.setState({ data: {
      ...this.state.data,
      [e.target.name]: e.target.value
    }
    });

  handleRadioChange = (e, { name, value }) => {
    this.setState({ data: {
      ...this.state.data,
      [name]: value,
    }
    });
  };

  handlePhoneChange = value =>
    this.setState({
      mobile: { ...this.state.mobile, mobile_number: value },
      numberModified: true,
    });

  onCountryChange = value =>
    this.setState((state) => ({
      mobile: { ...state.mobile, country_abbr: value },
    }));

  handleFileRemove = attachment => {
    const attachmentsState = [...this.state.attachments];
    const newDocumentTitles = this.state.document_titles;
    const index = attachmentsState.indexOf(attachment);
    if (index > -1) {
      this.setState({
        attachments: [
          ...attachmentsState.slice(0, index),
          ...attachmentsState.slice(index + 1),
        ],
        document_titles: [
          ...newDocumentTitles.slice(0, index),
          ...newDocumentTitles.slice(index + 1),
        ],
      });
    }
  };

  onDrop = attachments =>
    this.setState({
      attachments: [...attachments, ...this.state.attachments].slice(0, 3),
      document_titles: [
        ...attachments.map((attachment) => attachment.name),
        ...this.state.document_titles,
      ].slice(0, 3),
    });

  handleTitleChange = (e) => {
    const newTitle = e.target.value;
    let documentTitles = Object.assign([], this.state.document_titles);
    const index = Number(e.target.name);
    documentTitles = [
      ...documentTitles.slice(0, index),
      newTitle,
      ...documentTitles.slice(index + 1),
    ];
    this.setState({ document_titles: Object.assign([], documentTitles) });
  };

  showFiles = () => {
    const { attachments, document_titles } = this.state;
    return (
      <div>
        <h2 className="thin">Just Uploaded Files</h2>
        <div className="cards">
          {attachments.map((attachment, index) => {
            if (
              ['image/png', 'image/jpg', 'image/jpeg'].includes(attachment.type)
            ) {
              return (
                <div key={index} className="card card-md">
                  <div key={attachment.name}>
                    <div className="image fixedHt">
                      <img src={attachment.preview} />
                    </div>
                    <div className="extra content">
                      <br />
                      <label>Description</label>
                      <br />
                      <div className="flex">
                        <input
                          type="text"
                          className="icononRight"
                          placeholder="describe your image"
                          name={index}
                          value={document_titles[index]}
                          onChange={this.handleTitleChange}
                        />
                        <span className="button"
                              onClick={() => this.handleFileRemove(attachment)}>
                          <i className="icon-trash" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  };

  addEmailField = () =>
    this.setState({ emails: [ ...this.state.emails, { id: generateRandomId(), data: '' }] });

  removeEmailField = (id) => {
    const currentEmailToUpdate = [...this.state.emails];
    const indexToUpdate = currentEmailToUpdate.findIndex(
      (email) => email.id === id
    );
    this.setState({
      emails: [
        ...currentEmailToUpdate.slice(0, indexToUpdate),
        ...currentEmailToUpdate.slice(indexToUpdate + 1),
      ],
    });
  };

  handleEmailChange = (e) => {
    const currentEmailToUpdate = [...this.state.emails];
    const indexToUpdate = currentEmailToUpdate.findIndex(
      (email) => email.id === e.target.name
    );
    const newEmailToUpdate = Object.assign(
      {},
      currentEmailToUpdate[indexToUpdate],
      { data: e.target.value }
    );
    this.setState({
      emails: [
        ...currentEmailToUpdate.slice(0, indexToUpdate),
        newEmailToUpdate,
        ...currentEmailToUpdate.slice(indexToUpdate + 1),
      ],
    });
  };

  render() {
    const { data, mobile, numberModified, attachments, errors } = this.state;
    const { cancelForm } = this.props;
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <FormField
          label="Subject"
          name="subject"
          type="text"
          value={data.subject || ''}
          onChange={this.handleChange}
          error={errors.subject}
        />
        <div className={`field ${errors.message && 'error'}`}>
          <label>Message</label>
          <textarea
            rows="4"
            name="message"
            onChange={this.handleChange}
            value={data.message || ''}
          />
          {errors.message && <span data-tooltip={errors.message}><i className="icon-exclamation-triangle red" /></span>}

        </div>
        <div className="field">
          <label>Support Severity</label>
          <select
            className="dropdown"
            name="support_severity"
            value={data.support_severity}
            onChange={this.handleChange}
          >
            <option value="general_guidance">General Guidance</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="inline fields">
          <label>Support Type:</label>
          {errors.support_type && <span data-tooltip={errors.support_type} ><i className="icon-exclamation-triangle red" /></span>}
          <div className="field">
            <Radio
              label="Payment issue"
              name="support_type"
              value="payment_issue"
              checked={data.support_type === 'payment_issue'}
              onChange={this.handleRadioChange}
            />
          </div>
          <div className="field">
            <Radio
              label="General Query"
              name="support_type"
              value="general_query"
              checked={data.support_type === 'general_query'}
              onChange={this.handleRadioChange}
            />
          </div>
          <div className="field">
            <Radio
              label="Customer Query"
              name="support_type"
              value="customer_query"
              checked={data.support_type === 'customer_query'}
              onChange={this.handleRadioChange}
            />
          </div>
          <div className="field">
            <Radio
              label="Technical query"
              name="support_type"
              value="technical_query"
              checked={data.technical_query === 'technical_query'}
              onChange={this.handleRadioChange}
            />
          </div>
        </div>
        
        <Message positive>
          <Message.Header>Note:</Message.Header>
          <p>You can upload image of maximum size 5 MB</p>
        </Message>
        <label>Documents (optional)</label>

        <Dropzone
          className="dropzone"
          onDrop={this.onDrop}
          multiple
          accept="image/png, image/jpg, image/jpeg"
        >
          Drop attachments here or <br />
          <span className="link">
            Upload upto 3 attachments (only jpg, jpeg, or png accepted)
          </span>
        </Dropzone>
        {attachments && attachments.length > 0 && this.showFiles()}
        {this.props.success ? <span className="button secondary" onClick={cancelForm}>Go Back
          </span> : <Button
          primary
          type="submit"
          loading={this.props.requesting}
          disabled={this.props.requesting}
        >
          Submit
        </Button>}
        {!this.props.success && <span className="button" onClick={cancelForm}>
          Cancel
        </span>}
      </form>
    );
  }
}

SupportForm.propTypes = {
  cancelForm: PropTypes.func.isRequired,
  submitSupportRequest: PropTypes.func.isRequired,
};

export default SupportForm;
