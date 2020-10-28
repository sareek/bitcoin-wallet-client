import React from 'react';
import { DOCUMENT_URL } from 'containers/App/constants';
import Radio from 'components/common/Forms/Radio';

const renderDocumets = ({ _id, document_name, doc_type, deleteRow }) =>
  (<div className="card card-md" key={_id}>
    <div className="image fixedHt">
      <img src={`${DOCUMENT_URL}${document_name}`} alt="" />
    </div>
    <div className="extra content">
      <Radio
        value={doc_type}
        label={doc_type}
        disabled={'disabled'}
        name={_id}
        isChecked
      />
    </div>
    <div className="clearfix"><span className="float-right" onClick={() => deleteRow(_id)}><i className="icon-trash"></i></span></div>
  </div>);

const showUploadedFiles = (props) => {
  if (props.image_name && props.image_name.length > 0) {
    const files = props.image_name.map((file, idx) => {
      if (['image/png', 'image.jpg', 'image/jpeg'].includes(file.type)) {
        return (
          <div className="card card-md" key={`${file.name}_${idx}`}>
            <div>
              <div className="image fixedHt">
                <img src={file.preview} />
              </div>
              <div className="inline fields pd-top-sm">
                <div className="field">
                  <Radio
                    value="government-issued-ids"
                    label="Government Issued IDs"
                    name={idx}
                    isChecked={
                      props.document_type[idx] === "government-issued-ids"
                    }
                    handleChangeEvent={(e) => props.handleToggleOption(e, 'str')}
                  />
                </div>
                <div className="field">
                  <Radio
                    value="bank-account-details"
                    label="Bank statement"
                    name={idx}
                    isChecked={
                      props.document_type[idx] === "bank-account-details"
                    }
                    handleChangeEvent={(e) => props.handleToggleOption(e, 'str')}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
    return (
      <div className="cards">
        {files}
      </div>
    );
  }
};

const showAlreadyUploadedBankAccountFiles = (props) => {
  if (props.document && props.document.size > 0) {
    const files = props.document.entrySeq().map(([key, value]) => {
      const eachUploadedDocument = {
        _id: value.get('_id'),
        doc_type: value.get('doc_type'),
        document_name: value.get('document_name'),
        deleteRow: props.deleteRow
      };
      return renderDocumets(eachUploadedDocument);
    });
    return (
      <div className="cards">
        {files}
      </div>
    );
  }
};

const Preview = (props) => <div className="">
  {
    showUploadedFiles(props)

  }{
  showAlreadyUploadedBankAccountFiles(props)
}
</div>;

export default Preview;
