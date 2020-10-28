import {
  ADD_BANK_ACCOUNT_REQUEST,
  ADD_BANK_ACCOUNT_SUCCESS,
  ADD_BANK_ACCOUNT_FAILURE,
  GET_BANK_ACCOUNT_REQUEST,
  GET_BANK_ACCOUNT_SUCCESS,
  GET_BANK_ACCOUNT_FAILURE,
  DELETE_BANK_DOCUMENT_REQUEST,
  DELETE_BANK_DOCUMENT_SUCCESS,
  DELETE_BANK_DOCUMENT_FAILURE
} from "./constants";

import action from "utils/action";

export const getBankAccount = action(GET_BANK_ACCOUNT_REQUEST, "userId");
export const bankAccountLoaded = action(GET_BANK_ACCOUNT_SUCCESS, "response");
export const bankAccountLoadingFailure = action(
  GET_BANK_ACCOUNT_FAILURE,
  "error"
);

export const addBankAccount = action(
  ADD_BANK_ACCOUNT_REQUEST,
  "bankAccount",
  "file",
  "userId"
);
export const bankAccountAdded = action(ADD_BANK_ACCOUNT_SUCCESS, "response");
export const bankAccountAddingFailure = action(
  ADD_BANK_ACCOUNT_FAILURE,
  "error"
);

export const deleteBankAccountDocument = action(
  DELETE_BANK_DOCUMENT_REQUEST,
  "documentId"
);
export const deleteBankAccountDocumentSuccess = action(DELETE_BANK_DOCUMENT_SUCCESS, "response");
export const deleteBankAccountDocumentFailure = action(
  DELETE_BANK_DOCUMENT_FAILURE,
  "error"
);
