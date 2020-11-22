import { createSelector } from 'reselect';
import {initialState} from './reducer';

// const selectUserHomePage = (state) => state.homepage || initialState;
const selectUserHomePage = state => state.get('homepage');

const makeSelectSuccess = () => createSelector(selectUserHomePage, (state) => state.get('success'));
// const makeSelectResponse = () => createSelector(selectUserHomePage, (state) => state.get('response'));
const makeSelectError = () => createSelector(selectUserHomePage, (state) => state.get('error'));
const makeSelectRequesting = () => createSelector(selectUserHomePage, (state) => state.get('requesting'));
const makeSelectStatus = () => createSelector(selectUserHomePage, (state) => state.get('status'));
const makeSelectSignUpResponse = () => createSelector(selectUserHomePage, state => state && state.get('response'));
export { 
    makeSelectSuccess, 
    makeSelectSignUpResponse, 
    makeSelectError, 
    makeSelectRequesting, 
    makeSelectStatus,
};
