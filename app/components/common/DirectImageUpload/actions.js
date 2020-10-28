import action from 'utils/action';
import * as types from './constants';

export const uploadImageRequest = action(
  types.UPLOAD_IMAGE_REQUEST,
  'data',
  'image',
);
export const uploadImageSuccess = action(
  types.UPLOAD_IMAGE_SUCCESS,
  'response',
);
export const uploadImageFailure = action(types.UPLOAD_IMAGE_FAILURE, 'error');

export const loadModuleImageRequest = action(
  types.LOAD_MODULE_IMAGE_REQUEST,
  'module',
);
export const loadModuleImageSuccess = action(
  types.LOAD_MODULE_IMAGE_SUCCESS,
  'response',
);
export const loadModuleImageFailure = action(
  types.LOAD_MODULE_IMAGE_FAILURE,
  'error',
);

export const clearMessage = action(types.CLEAR_MESSAGE);
