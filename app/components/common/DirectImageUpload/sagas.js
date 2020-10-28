import {
  take,
  takeLatest,
  fork,
  call,
  put,
  select,
  cancel,
} from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import * as types from './constants';
import * as actions from './actions';
import API from 'utils/apiHelper';

function* redirectOnImageUploadSuccess() {
  const action = yield take(types.UPLOAD_IMAGE_SUCCESS);
}

function* uploadImageRequestService(action) {
  const token = localStorage.getItem('token');
  const successWatcher = yield fork(redirectOnImageUploadSuccess);
  const { data, image } = action;
  yield fork(
    API.multipartPost(
      `common/text-editor`,
      actions.uploadImageSuccess,
      actions.uploadImageFailure,
      data,
      image,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.UPLOAD_IMAGE_FAILURE]);
  yield cancel(successWatcher);
}

function* redirectOnImageLoadSuccess() {
  const action = yield take(types.LOAD_MODULE_IMAGE_SUCCESS);
}

function* loadModuleImageRequestService(action) {
  const token = localStorage.getItem('token');
  const successWatcher = yield fork(redirectOnImageLoadSuccess);
  const { module } = action;
  yield fork(
    API.get(
      // `common/text-editor?module=${module}&page=1&perpage=1000`,
      `common/text-editor?page=1&perpage=1000`,

      actions.loadModuleImageSuccess,
      actions.loadModuleImageFailure,
      token,
    ),
  );
  yield take([LOCATION_CHANGE, types.LOAD_MODULE_IMAGE_FAILURE]);
  yield cancel(successWatcher);
}

// Individual exports for testing
export default function* imageUploadWatcher() {
  // See example in containers/HomePage/sagas.js
  yield takeLatest(types.UPLOAD_IMAGE_REQUEST, uploadImageRequestService);
  yield takeLatest(
    types.LOAD_MODULE_IMAGE_REQUEST,
    loadModuleImageRequestService,
  );
}

// All sagas to be loaded
// export default [imageUploadWatcher];
