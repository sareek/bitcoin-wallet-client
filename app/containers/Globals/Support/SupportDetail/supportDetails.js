import React from 'react';
import { Button } from 'semantic-ui-react';
import { DOCUMENT_URL } from 'containers/App/constants';
// import avatar from "../../../../assets/image/avatar.png";


const SupportDetails = ({details, handleReplyClick, handleCloseCase, handleGoBack }) => {
  return (<div className="">

      {/*
       Discarded Values on this page.

       {details.name}
       {details.ticket_id}
       {details.user_id}
       {details.user_type}
       {details.added_by}
       {details.contact_method}
       {details.mobile_number}
       {details.cc_emails.map((email) => <span key={email}>{email}</span>)}
       */}


      <div className="mg-btm-sm">
        <Button onClick={handleGoBack}>Back</Button>
      </div>


      <h2>{details.subject}</h2>

      <div className="horizontal divided list mg-btm-sm">
        <div className="item">Type:  {details.support_type}</div>
        <div className="item">Severity: {details.support_severity}</div>
        <div className="item">Status: {details.status_ticket}
          {details.status_ticket !== 'closed' &&
          <Button basic className="red mg-left-sm" onClick={handleCloseCase}>Close Ticket</Button>
          }
        </div>

      </div>


      <div className="grid">
        <div className="right floated eight wide column">
          <div className="callout2">
            <p>{details.message}</p>
            {details.attachments && details.attachments.length > 0 &&
            <div>
              {details.attachments.map(value => (
                <div key={value.document_name}>
                  <a target="_blank" href={`${DOCUMENT_URL}${value.document_name}`}
                  >
                    <i className="icon icon-photo"/>
                    {value.document_name}
                  </a>
                </div>)
              )}
            </div>
            }

          </div>

<div className="align-right mg-btm-sm">
You</div>


        </div>
      </div>




    </div>

  );
};

export default SupportDetails;
