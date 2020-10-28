import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { showDialog } from 'containers/App/actions';
import { makeSelectDialog, makeSelectUser } from 'containers/App/selectors';
import {
  // makeSelectSuccess,
  makeSelectResponse,
  makeSelectError,
  makeSelectRequesting,
  makeSelectBankAccountInfo
} from './selectors';
import { getBankAccount, addBankAccount, deleteBankAccountDocument } from './actions';
import Toaster from 'components/Toaster';
import DeleteConfirmation from 'components/Actions/DeleteConfirmation';
import BankAccountForm from './Form/BankAccountForm';
import saga from './sagas'
import reducer from './reducers'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from "redux";


const mapDispatchToProps = dispatch => ({
  getBankAccount: userId => dispatch(getBankAccount(userId)),
  addBankAccount: (bankAccount, file, userId) => dispatch(addBankAccount(bankAccount, file, userId)),
  deleteBankAccountDocument: (documentId) => dispatch(deleteBankAccountDocument(documentId)),
  showDialog: (dialog) => dispatch(showDialog(dialog)),
  hideDialog: () => dispatch(showDialog(null)),
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  bankInfo: makeSelectBankAccountInfo(),
  successResponse: makeSelectResponse(),
  errorResponse: makeSelectError(),
  isRequesting: makeSelectRequesting(),
  dialog: makeSelectDialog()
});
class BankAccount extends React.Component {
  state = {
    show: false,
    bank_details: {
      _id: Math.random(),
      account_holder_name: '',
      bank_account_number: '',
      bank_name: '',
      routing_number: '',
      bank_branch_address: '',
      bank_account_type: '',
      swift_code: '',
      iban_ifsc_code: '',
      billing_address_country: 'United States',
      billing_address_city: '',
      billing_address_zip_postal_code: '',
      billing_address_state_region_province: '',
      billing_address_address_line_1: '',
      billing_address_address_line_2: '',
      doc_types: []
    },
    file: [],
    document: [],
    form_valid: true,
    documentId: "",
    errors: {},
    btn_action: ""
  };

  static propTypes = {
    getBankAccount: PropTypes.func.isRequired,
    addBankAccount: PropTypes.func.isRequired,
    deleteBankAccountDocument: PropTypes.func.isRequired,
    showDialog: PropTypes.func.isRequired,
    hideDialog: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getBankAccount(this.props.user.get('_id'));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bankInfo !== this.props.bankInfo) {
      const newBankInfo = nextProps.bankInfo.toJS();
      this.setState({
        bank_details: {
          ...this.state.bank_details,
          ...newBankInfo,
          // _id: bankInfo.get('user_id'),
          // account_holder_name: bankInfo.get('account_holder_name'),
          // bank_account_number: bankInfo.get('bank_account_number'),
          // bank_name: bankInfo.get('bank_name'),
          // routing_number: bankInfo.get('routing_number'),
          // billing_address_country: bankInfo.get('billing_address_country') ? bankInfo.get('billing_address_country') : "United States",
          // billing_address_city: bankInfo.get('billing_address_city'),
          // billing_address_zip_postal_code: bankInfo.get('billing_address_zip_postal_code'),
          // billing_address_state_region_province: bankInfo.get(
          //   'billing_address_state_region_province'
          // ),
          // billing_address_address_line_1: bankInfo.get('billing_address_address_line_1'),
          // billing_address_address_line_2: bankInfo.get('billing_address_address_line_2'),
          // bank_branch_address: bankInfo.get('bank_branch_address'),
          // bank_account_type: bankInfo.get('bank_account_type'),
          // swift_code: bankInfo.get('swift_code'),
          // iban_ifsc_code: bankInfo.get('iban_ifsc_code')
        },
        document: nextProps.bankInfo.get('document'),
        file: (this.state.btn_action !== 'delete') ? [] : [...this.state.file],
        btn_action: ''
      });
    }
  }

  validate = (data) => {
    const errors = {};
    if (!data.account_holder_name) errors.account_holder_name = "Account holder name can't be blank";
    if (!data.bank_account_number) errors.bank_account_number = "Bank Account number can't be blank";
    if (!data.bank_name) errors.bank_name = "Bank name can't be blank";
    if (!data.swift_code) errors.swift_code = "Swift code can't be blank";
    if (!data.bank_branch_address) errors.bank_branch_address = "Branch address of bank can't be blank";
    if (!data.bank_account_type) errors.bank_account_type = "Account type can't be blank";
    if (!data.billing_address_country) errors.billing_address_country = "Country can't be blank";
    if (!data.billing_address_city) errors.billing_address_city = "City can't be blank";
    if (!data.billing_address_zip_postal_code) errors.billing_address_zip_postal_code = "Zip code can't be blank";
    if (!data.billing_address_state_region_province) errors.billing_address_state_region_province = "Region can't be blank";
    if (!data.billing_address_address_line_1) errors.billing_address_address_line_1 = "Address Line 1 can't be blank";
    return errors;
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(state => ({
      bank_details: { ...state.bank_details, [name]: value }
    }));
  };

  handleAccountType = e => {
    const { value } = e.target;
    this.setState(state => ({
      bank_details: { ...state.bank_details, bank_account_type: value }
    }));
  };

  getFilesCountUploaded = ({file, document}) => {
    const uploadedFilesCount = (file && file.length > 0) ? file.length : 0;
    const uploadedDocsCount = (document && document.size > 0)
      ? document.size :
      (document && document.length > 0)
        ?
        document.length
        :
        0;
    return uploadedFilesCount + uploadedDocsCount;
  };

  onDrop = files => {
    const totalCount = this.getFilesCountUploaded(this.state);
    const uploadFilesData = [];
    for(let i=0; i<(4-totalCount); i++) {
      if(files[i]!==undefined){
        uploadFilesData.push(files[i]);
      }
    }
    this.setState({
      file: [...this.state.file, ...uploadFilesData],
      bank_details: {
        ...this.state.bank_details,
        doc_types: [...this.state.bank_details.doc_types, ...uploadFilesData.map(()=> null)]
      },
      form_valid: false
    });
  };

  handleToggleOption = (e, type) => {
    const newValue = e.target.value;
    let docsType = [...this.state.bank_details.doc_types];
    const index = Number(e.target.name);
    docsType[index] = newValue;
    const nullValues = docsType.filter((item) => item===null);
    this.setState({
      bank_details: { ...this.state.bank_details, doc_types: docsType },
      form_valid: (this.state.file && !(docsType && nullValues.length>0))
    });
  };

  deleteRow = (cell) => {
    this.setState({ show: true, documentId: cell,
      btn_action: 'delete' });
  };

  deleteBankAccountDocument = () => {
    this.props.deleteBankAccountDocument(this.state.documentId)
    this.setState({ show: false, documentId: "" });
  };

  hideDialog = (cell) => {
    this.setState({ show: false, documentId: "" });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { bank_details } = this.state;
    const errors = this.validate(bank_details);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      if (this.state.form_valid) {
        this.setState(
          {
            bank_details: {
              ...bank_details,
              _id: this.props.user.get('_id'),
              btn_action: 'save',
              doc_types: []
            }
          },
          () => {
            if (bank_details._id) {
              this.props.addBankAccount(
                bank_details,
                this.state.file,
                bank_details._id
              );
            } else {
              this.props.addBankAccount(
                bank_details,
                this.state.file,
                this.props.user.get('_id')
              );
            }

            this.setState(
              {
                bank_details: {
                  ...bank_details,
                  doc_types: []
                }
              });
          }
        );
      }
    }
  };



  render() {
    const { successResponse, errorResponse, isRequesting } = this.props;
    let message;
    if (successResponse && typeof successResponse === 'string') {
      message = <Toaster message={successResponse} timeout={1000} success />;
    }
    if (errorResponse && typeof errorResponse === 'string') {
      message = <Toaster message={errorResponse} timeout={1000} error />;
    }
    return (
      <div className="pd-top-md bank-account">
        {message && message}
        {this.state.show && <DeleteConfirmation
          hideDialog={this.hideDialog}
          deleteKey={""}
          text="Bank Document"
          onDelete={() => this.deleteBankAccountDocument()}
        />}
        <div className="align-center mg-btm-md">
          <h2>How do you like to withdraw</h2>
          <p className="align-center text-muted">
             Offers you the convenience of multiple ways to receive your payments.
          </p>
        </div>
        <div className="sectionTitle">
          <h2>
            <span>OR</span>
          </h2>
        </div>
        {this.state.bank_details && <BankAccountForm
          value={this.state.bank_details}
          file={this.state.file}
          errors={this.state.errors}
          document={this.state.document}
          handleChange={this.handleChange}
          handleToggleOption={this.handleToggleOption}
          handleSubmit={this.handleSubmit}
          onDrop={this.onDrop}
          handleAccountType={this.handleAccountType}
          dropzoneDisabled={ this.getFilesCountUploaded(this.state) >= 4 }
          form_valid={this.state.form_valid}
          isRequesting={isRequesting}
          deleteRow={(cell) => this.deleteRow(cell)}
        />}
      </div>
    );
  }
}

BankAccount.propTypes = {
  getBankAccount: PropTypes.func.isRequired,
  addBankAccount: PropTypes.func.isRequired
};

const withReducer = injectReducer({ key: 'adminProfileBankAccount', reducer });
const withSaga = injectSaga({ key: 'adminProfileBankAccount', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BankAccount);

