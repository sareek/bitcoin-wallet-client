import * as types from './constants';
import action from "utils/action";


export const getConnectionStatusRequest = action(types.GET_CONNECTION_STATUS_REQUEST, 'payload');
export const getConnectionStatusSuccess = action(types.GET_CONNECTION_STATUS_SUCCESS, 'response');
export const getConnectionStatusFailure = action(types.GET_CONNECTION_STATUS_FAILURE, 'error');

export const linkGoogleRequest = action(types.LINK_GOOGLE_REQUEST, 'payload');
export const linkGoogleSuccess = action(types.LINK_GOOGLE_SUCCESS, 'response');
export const linkGoogleFailure = action(types.LINK_GOOGLE_FAILURE, 'error');

export const unlinkGoogleRequest = action(types.UNLINK_GOOGLE_REQUEST, 'payload');
export const unlinkGoogleSuccess = action(types.UNLINK_GOOGLE_SUCCESS, 'response');
export const unlinkGoogleFailure = action(types.UNLINK_GOOGLE_FAILURE, 'error');

export const linkFacebookRequest = action(types.LINK_FACEBOOK_REQUEST, 'payload');
export const linkFacebookSuccess = action(types.LINK_FACEBOOK_SUCCESS, 'response');
export const linkFacebookFailure = action(types.LINK_FACEBOOK_FAILURE, 'error');

export const unlinkFacebookRequest = action(types.UNLINK_FACEBOOK_REQUEST, 'payload');
export const unlinkFacebookSuccess = action(types.UNLINK_FACEBOOK_SUCCESS, 'response');
export const unlinkFacebookFailure = action(types.UNLINK_FACEBOOK_FAILURE, 'error');

export const linkLinkedinRequest = action(types.LINK_LINKEDIN_REQUEST, 'payload', 'redirect_uri');
export const linkLinkedinSuccess = action(types.LINK_LINKEDIN_SUCCESS, 'response');
export const linkLinkedinFailure = action(types.LINK_LINKEDIN_FAILURE, 'error');

export const unlinkLinkedinRequest = action(types.UNLINK_LINKEDIN_REQUEST, 'payload');
export const unlinkLinkedinSuccess = action(types.UNLINK_LINKEDIN_SUCCESS, 'response');
export const unlinkLinkedinFailure = action(types.UNLINK_LINKEDIN_FAILURE, 'error');

export const linkTwitterRequest = action(types.LINK_TWITTER_REQUEST, 'payload');
export const linkTwitterSuccess = action(types.LINK_TWITTER_SUCCESS, 'response');
export const linkTwitterFailure = action(types.LINK_TWITTER_FAILURE, 'error');

export const unlinkTwitterRequest = action(types.UNLINK_TWITTER_REQUEST, 'payload');
export const unlinkTwitterSuccess = action(types.UNLINK_TWITTER_SUCCESS, 'response');
export const unlinkTwitterFailure = action(types.UNLINK_TWITTER_FAILURE, 'error');
