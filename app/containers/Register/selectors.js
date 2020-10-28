import { createSelector } from "reselect";

const selectSignup = state => state.get('register');

const makeSelectSuccess = () => createSelector(selectSignup, state => state.get('success'));
const makeSelectResponse = () => createSelector(selectSignup, state => state.get('response'));
const makeSelectError = () => createSelector(selectSignup, state => state.get('error'));
const makeSelectRequesting = () => createSelector(selectSignup, state => state.get('requesting'));
const makeSelectSMSRequesting = () => createSelector(selectSignup, state => state.get('is_sms_Requesting'));
const makeSelectSmsSent = () => createSelector(selectSignup, state => state.get('sms_sent'));
const makeSelectMobileNumberValidated = () => createSelector(selectSignup, state => state.get('mobile_number_validated'));
const makeSelectVerificationResponse = () => createSelector(selectSignup, state => state.get('verify_response'));
const makeSelectVerificationError = () => createSelector(selectSignup, state => state.get('verify_error'));
const makeSelectVerificationData = () => createSelector(selectSignup, state => state.get('verify_data'));
const makeSelectVerify = () => createSelector(selectSignup, state => state.get('verify'));

export {
  makeSelectSuccess,
  makeSelectResponse,
  makeSelectError,
  makeSelectRequesting,
  makeSelectSMSRequesting,
  makeSelectSmsSent,
  makeSelectMobileNumberValidated,
  makeSelectVerificationError,
  makeSelectVerificationResponse,
  makeSelectVerificationData,
  makeSelectVerify
};
