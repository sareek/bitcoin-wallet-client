import { fromJS } from 'immutable';
import * as types from './constants';
import {normalize} from 'normalizr';
import {contentTemplateSchema} from './schemas';

const initialState = fromJS({
  requesting: false,
  ownDashboard: true,
  dialog: {},
  token: '',
  user: {},
  contentTemplateNormalized: {},
  localeSet: false,
});

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.NOT_USER:
      return state.merge({
        ownDashboard: false,
      });
    case types.SHOW_DIALOG:
      return state.merge({
        dialog: fromJS(action.payload),
      });
    case types.SET_TOKEN:
      return state.merge({
        token: action.payload,
      });
    case types.SET_USER:
      return state.merge({
        user: fromJS(action.payload),
      });
 
    default:
      return state;
  }
}

export default reducer;
