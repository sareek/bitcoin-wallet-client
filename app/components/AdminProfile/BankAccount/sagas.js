import {
  takeLatest,
  take,
  select,
  put,
  fork,
  cancel,
  call
} from "redux-saga/effects";
// import { LOCATION_CHANGE, push } from "react-router-redux";
// import pick from "lodash/pick";
// import omit from "lodash/omit";

import {
  ADD_BANK_ACCOUNT_REQUEST,
  GET_BANK_ACCOUNT_REQUEST,
  DELETE_BANK_DOCUMENT_REQUEST
} from "./constants";

import {
  bankAccountLoaded,
  bankAccountLoadingFailure,
  bankAccountAdded,
  bankAccountAddingFailure,
  deleteBankAccountDocumentSuccess,
  deleteBankAccountDocumentFailure
} from "./actions";


import API from "utils/apiHelper";


function* getBankAccount(action) {
  const token = localStorage.getItem("token");
  yield call(
    API.get(
      `api/user/data/bank-account/${action.userId}`,
      bankAccountLoaded,
      bankAccountLoadingFailure,
      token
    )
  );
}

function* addBankAccount(action) {
  const token = localStorage.getItem("token");
  const { bankAccount, file, userId } = action;
  yield fork(
    API.multipartPost(
      `api/user/data/bank-account/${userId}`,
      bankAccountAdded,
      bankAccountAddingFailure,
      bankAccount,
      file,
      token,
      'put'
    )
  );
}

function* deleteBankAccount(action) {
  const token = localStorage.getItem("token");
  const { documentId } = action;
  yield fork(
    API.delete(
      `api/user/data/remove/bank-account/${documentId}`,
      deleteBankAccountDocumentSuccess,
      deleteBankAccountDocumentFailure,
      token
    )
  );
}

export default function* bankAccountWatcher() {
  yield takeLatest(GET_BANK_ACCOUNT_REQUEST, getBankAccount);
  yield takeLatest(ADD_BANK_ACCOUNT_REQUEST, addBankAccount);
  yield takeLatest(DELETE_BANK_DOCUMENT_REQUEST, deleteBankAccount);
}

