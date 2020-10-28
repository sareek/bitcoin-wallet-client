import { takeLatest, take, select, put, fork, cancel, call } from "redux-saga/effects";
import * as types from "./constants";
import {
  myProfileLoaded,
  myProfileLoadingFailure
} from "./actions";
import API from "utils/apiHelper";


function* loadMyProfile(action) {
  const token = localStorage.getItem("token");

  yield call(
    API.get(
      `api/imp/applicant/data/${action.userId}`,
      myProfileLoaded,
      myProfileLoadingFailure,
      token
    )
  );
}

export default function* documentsWatcher() {
  yield takeLatest(types.LOAD_MY_PROFILE, loadMyProfile);
}
