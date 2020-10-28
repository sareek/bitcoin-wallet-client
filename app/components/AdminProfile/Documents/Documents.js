import React from 'react';
import {
  IMP_DOCUMENT_PATH
} from './constants';
import { DOCUMENT_URL } from "containers/App/constants";

const Documents = (props) => {
  const { documents } = props;
    return (
      <div className="white-box submitted_documents divided list mg-top-sm">
        {documents.size === 0 && <span className="negative message tiny">No Documents</span>}
        {documents.map(document => {
          return (
            <div className="item" key={document.get("document_name")}>
              <a
                href={`${DOCUMENT_URL}${document.get(
                  "document_name"
                )}`}
                download
              >
                <i className="icon-file"/>{" "}
                {document.get("document_original_name")}
                <br />
                <i className="icon-download-cloud"/>
              </a>
            </div>
          );
        })}
      </div>
    );
  };

export default Documents;
