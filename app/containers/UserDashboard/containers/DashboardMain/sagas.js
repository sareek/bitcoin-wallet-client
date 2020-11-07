import { call, takeLatest } from 'redux-saga/effects';
import * as types from './constants';
import * as actions from './actions';
import API from 'utils/apiHelper';
import getToken from 'utils/getToken';
import jwtDecode from 'jwt-decode';

function* loadBasicInfoFlow(payload) {
    const token = getToken();
    try {
      const decoded = jwtDecode(token);
      if (
        typeof decoded === 'object' &&
        decoded.hasOwnProperty('email') 
      ) {
        yield call(
          API.post(
            `get_general_info/`,
            actions.loadBasicInfoSuccess,
            actions.loadBasicInfoFailure,
            {email: decoded.email},
            token,
          ),
        );
      }
    } catch(error) {
      throw(error);
    }
  }

export default function* userDashboardWatcher() {
    yield takeLatest(types.LOAD_BASIC_INFO_REQUEST, loadBasicInfoFlow);
}
