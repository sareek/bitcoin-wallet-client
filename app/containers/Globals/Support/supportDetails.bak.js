import React from 'react';
import { Button } from 'semantic-ui-react';
import { DOCUMENT_URL } from 'containers/App/constants';

const SupportDetails = ({details, handleReplyClick, handleCloseCase, handleGoBack }) => {
  return (<div className="">
      <div className="mg-btm-sm">
        <Button onClick={handleGoBack}>Back</Button>
      </div>
      <h1>Support Ticket #{details.ticket_id}</h1>
      <div className="card-view">
        <label>Name</label>
        <div className="text-md mg-btm-sm">
          {details.name}
          <p className="text-muted text-sm">{details.user_id}</p>
        </div>
        <label>Added By</label>
        <div className="text-md mg-btm-sm">
          {details.added_by}
          <p className="text-muted text-sm">{details.user_type}</p>
        </div>
        <table className="table celled">
          <tbody>
          <tr>
            <td>
              <label>Status</label>
              <div className="text-md mg-btm-sm">{details.status_ticket}</div>
            </td>
            <td>
              <label>Support Type</label>
              <div className="text-md mg-btm-sm">{details.support_type}</div>
            </td>
            <td>
              <label>Severity</label>
              <div className="text-md mg-btm-sm">{details.support_severity}</div>
            </td>
            <td>
              <label>Added On</label>
              <div className="text-md mg-btm-sm">{details.added_on}</div>
            </td>
          </tr>
          </tbody>
        </table>
        <label>Subject</label>
        <div className="text-md mg-btm-sm">{details.subject}</div>
        <label>Message</label>
        <div className="text-md mg-btm-sm">{details.message}</div>
        <label>Contact Method</label>
        <div className="text-md mg-btm-sm">{details.contact_method}</div>
        {details.mobile_number &&
        <div>
          <label>Mobile Number</label>
          <div className="text-md mg-btm-sm">{details.mobile_number}</div>
        </div>}
        {details.cc_emails &&
        details.cc_emails.length > 0 &&
        <div>
          <label>CCd emails:</label>
          <div className="text-md mg-btm-sm">
            {details.cc_emails.map((email) => <span key={email}>{email}</span>)}
          </div>
        </div>}
        <div>
          {details.attachments && details.attachments.length > 0 &&
          <div>
            Attachments added
            <div className="cards">
              {details.attachments.map(value => (
                  <div className="card card-sm" key={value.document_name}>
                    <div className="image fixedHt">
                      <img
                        src={`${DOCUMENT_URL}${value.document_name}`}
                        alt={value.document_title}
                      />
                    </div>
                  </div>)
              )}
            </div>
          </div>}
        </div>
        {details.status_ticket !== 'closed' &&
        <div className="clearfix mg-top-md">
          <div className="float-right">
            <Button negative onClick={handleCloseCase}>Close Case</Button>
            <Button secondary onClick={handleReplyClick}>Reply</Button>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default SupportDetails;
