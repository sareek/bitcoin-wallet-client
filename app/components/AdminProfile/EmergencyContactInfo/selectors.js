import { createSelector } from "reselect";

const selectEmergencyContactInfo = state => state.get("adminProfileEmergencyContactInfo");

const makeSelectEmergencyContactInfo = () => createSelector(selectEmergencyContactInfo, state => state);
const makeSelectEmergencyContacts = () => createSelector(selectEmergencyContactInfo, state => state.get('emergencyContacts'));
const makeSelectErrorResponse = () => createSelector(selectEmergencyContactInfo, state => state.get('error'));
const makeSelectRequesting = () => createSelector(selectEmergencyContactInfo, state => state.get('requesting'));
const makeSelectSuccessResponse = () => createSelector(selectEmergencyContactInfo, state => state.get('response'));
const makeSelectSuccess = () => createSelector(selectEmergencyContactInfo, state => state.get('success'));

export {
  makeSelectEmergencyContactInfo,
  makeSelectEmergencyContacts,
  makeSelectRequesting,
  makeSelectErrorResponse,
  makeSelectSuccessResponse,
  makeSelectSuccess
};
