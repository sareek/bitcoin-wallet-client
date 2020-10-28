import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');
const selectRouter = state => state.get('router');
const selectLogin = state => state.get('login');

const selectInitialize = () => createSelector(selectGlobal, state => state.get('initialized'));
const makeSelectIntroTool = () => createSelector(selectGlobal, state => state.get('loadIntroTool'));
const makeSelectError = () => createSelector(selectGlobal, state => state.get('error'));
const makeSelectUserId = () => createSelector(makeSelectUser(), state => state.get('user_id'));
const makeSelectDialog = () => createSelector(selectGlobal, state => state.get('dialog'));
const makeSelectMessage = () => createSelector(selectGlobal, state => state.get('message'));
const makeSelectLoading = () => createSelector(selectGlobal, state => state.get('loading'));
const makeSelectToast = () => createSelector(selectGlobal, state => state.get('toast'));
const makeSelectFirstLoad = () => createSelector(selectGlobal, state => state.get('firstLoad'));

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.get('location').toJS(),
  );
const makeSelectUser = () => createSelector(selectLogin, state => state.get('userInfo'));

const makeSelectCountryLanguage = () => createSelector(selectGlobal, (state) =>
  state.get('countryLanguage')
);
const makeSelectLocaleSet = () => createSelector(selectGlobal, (state) =>
  state.get('localeSet')
);

export { 
  makeSelectLocation,
  makeSelectUser,
  makeSelectDialog,
  makeSelectError,
  makeSelectFirstLoad,
  makeSelectIntroTool,
  makeSelectLoading,
  makeSelectToast,
  makeSelectUserId,
  makeSelectMessage,
  selectInitialize,
  makeSelectCountryLanguage,
  makeSelectLocaleSet
};
