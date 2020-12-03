import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  response: null,
  error: null,
  requesting: false,
  success: false,
  status: null,
});

function homePageReducer(state = initialState, action = {}) {
  switch (action.type) {

    case types.CLEAR_STATE:
        return initialState;  
    default:
      return state;
  }
}

export default homePageReducer;
