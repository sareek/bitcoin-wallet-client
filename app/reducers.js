/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import loginReducer from 'containers/Login/reducer';
import globalReducer from 'containers/App/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

//  Initial routing state
// const routeInitialState = fromJS({
//   location: null
// });

// function routeReducer(state = routeInitialState, action) {
//   switch (action.type) {
//     /* istanbul ignore next */
//     case LOCATION_CHANGE:
//       return state.merge({
//         location: action.payload
//       });
//     default:
//       return state;
//   }
// }

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    // route: routeReducer,
    global: globalReducer,
    login: loginReducer,
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  // const mergeWithRouterState = connectRouter(history);
  return rootReducer;
}
