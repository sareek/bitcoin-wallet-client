import { createSelector } from "reselect";

const selectDocuments = state => state.get("adminProfileDocuments");

const makeSelectSuccess = () => createSelector(selectDocuments, state => state.get('success'));
const makeSelectResponse = () => createSelector(selectDocuments, state => state.get('response'));
const makeSelectError = () => createSelector(selectDocuments, state => state.get('error'));
const makeSelectRequesting = () => createSelector(selectDocuments, state => state.get('requesting'));
const makeSelectMyProfile = () => createSelector(selectDocuments, myProfileState => myProfileState.get('documents'));
const makeSelectSubmittedDocuments = () => createSelector(makeSelectMyProfile(), profile => profile.get('submitted_documents'));
const makeSelectApprovedDocuments = () => createSelector(makeSelectMyProfile(), profile => profile.get('approval_documents'));

export {
  makeSelectSuccess,
  makeSelectResponse,
  makeSelectRequesting,
  makeSelectError,
  makeSelectMyProfile,
  makeSelectSubmittedDocuments,
  makeSelectApprovedDocuments
};
