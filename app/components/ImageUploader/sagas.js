/**
 * Created by saroj on 4/13/19.
 */
import { take, takeLatest, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from "react-router-redux";
import * as types from './constants';
import * as actions from './actions';
import API from 'utils/apiHelper';



function* uploadImageService(action) {
  const token = localStorage.getItem("token");

  const { file, url } = action
  yield call(
    API.multipartPost(
      `${url}/${url}-image`,
      actions.uploadImageSuccess,
      actions.uploadImageFailure,
      "",
      file,
      token
    )
  )
}


// Individual exports for testing
export default function* uploaderWatcher() {
  // See example in containers/HomePage/sagas.js
  yield takeLatest(types.UPLOAD_IMAGE_REQUEST, uploadImageService);
}

