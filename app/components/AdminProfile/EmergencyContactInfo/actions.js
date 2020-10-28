import * as types from './constants';
import action from "utils/action";

export const addEmergencyContactInfoRequest = action(types.ADD_EMERGENCY_CONTACT_INFO_REQUEST, 'data', 'userId');
export const addEmergencyContactInfoSuccess = action(types.ADD_EMERGENCY_CONTACT_INFO_SUCCESS,'response');
export const addEmergencyContactInfoFailure = action(types.ADD_EMERGENCY_CONTACT_INFO_FAILURE, 'error');

export const updateEmergencyContactInfoRequest = action(types.UPDATE_EMERGENCY_CONTACT_INFO_REQUEST, 'data', 'userId', 'id');
export const updateEmergencyContactInfoSuccess = action(types.UPDATE_EMERGENCY_CONTACT_INFO_SUCCESS,'response');
export const updateEmergencyContactInfoFailure = action(types.UPDATE_EMERGENCY_CONTACT_INFO_FAILURE, 'error');

export const getEmergencyContactInfoRequest = action(types.GET_EMERGENCY_CONTACT_INFO_REQUEST, 'userId');
export const getEmergencyContactInfoSuccess = action(types.GET_EMERGENCY_CONTACT_INFO_SUCCESS, 'response');
export const getEmergencyContactInfoFailure = action(types.GET_EMERGENCY_CONTACT_INFO_FAILURE, 'error');

export const removeEmergencyContactInfoRequest = action(types.REMOVE_EMERGENCY_CONTACT_INFO_REQUEST, 'userId', 'id');
export const removeEmergencyContactInfoSuccess = action(types.REMOVE_EMERGENCY_CONTACT_INFO_SUCCESS, 'response');
export const removeEmergencyContactInfoFailure = action(types.REMOVE_EMERGENCY_CONTACT_INFO_FAILURE, 'error');

export const emergencyContactInfoClearState = action(types.EMERGENCY_CONTACT_INFO_CLEAR_STATE);
export const emergencyContactInfoClearMessages = action(types.EMERGENCY_CONTACT_INFO_CLEAR_MESSAGES);
export const emergencyContactInfoClearErrors = action(types.EMERGENCY_CONTACT_INFO_CLEAR_ERRORS);
