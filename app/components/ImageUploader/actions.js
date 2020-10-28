/**
 * Created by saroj on 4/13/19.
 */
/*
 *
 * Blogs actions
 *
 */

import * as types from './constants';
import action from "utils/action";

export const uploadImageRequest = action(types.UPLOAD_IMAGE_REQUEST, 'file', 'url');
export const uploadImageSuccess = action(types.UPLOAD_IMAGE_SUCCESS, 'response');
export const uploadImageFailure = action(types.UPLOAD_IMAGE_FAILURE, 'error');

