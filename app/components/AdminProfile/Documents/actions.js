import * as types from './constants';
import action from 'utils/action';

export const loadMyProfile = action(types.LOAD_MY_PROFILE, 'userId');
export const myProfileLoaded = action(types.LOAD_MY_PROFILE_SUCCESS, 'myProfile');
export const myProfileLoadingFailure = action(types.LOAD_MY_PROFILE_FAILURE, 'error');
