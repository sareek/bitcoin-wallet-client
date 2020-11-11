import { createSelector } from "reselect";

const selectMultiFactorAuth = state => state.get("addMultiFactorAuth");

const makeSelectMultiFactorAuth = () => createSelector(selectMultiFactorAuth, documentState => documentState);
const makeSelectEnable2FAResponse = () => createSelector(selectMultiFactorAuth, state => state.get('qrPath'));

const makeSelectErrorResponse = () => createSelector(selectMultiFactorAuth, state => state.get('error'));
const makeSelectRequesting = () => createSelector(selectMultiFactorAuth, state => state.get('isLoading'));
const makeSelectSuccessResponse = () => createSelector(selectMultiFactorAuth, state => state.get('response'));

const makeSelectBasicInfoRequesting = () => createSelector(selectMultiFactorAuth, state => state.get('basicInfoRequesting'));

const makeSelectRecoveryCodes = () => createSelector(selectMultiFactorAuth, state => state.get('recoveryCodes'));
const makeSelectMessage = () => createSelector(selectMultiFactorAuth, state => state.get('message'));
const makeSelectRecoveryCodeGeneratedOn = () => createSelector(selectMultiFactorAuth, state => state.get('recovery_code_generated_on'));
const makeSelectUser = () => createSelector(selectMultiFactorAuth, state => state.get('user'));

export {
  makeSelectMultiFactorAuth,
  makeSelectRequesting,
  makeSelectErrorResponse,
  makeSelectSuccessResponse,
  makeSelectRecoveryCodes,
  makeSelectMessage,
  makeSelectRecoveryCodeGeneratedOn,
  makeSelectUser,
  makeSelectBasicInfoRequesting,
  makeSelectEnable2FAResponse
};
