/**
 * Created by saroj on 4/13/19.
 */
import { createSelector } from 'reselect';

/**
 * Direct selector to the BlogCategory state domain
 */

const selectBlogsDomain = state => state.get('imageUpload');

const makeSelectSuccess = () => createSelector(selectBlogsDomain, state => state.get('success'));
const makeSelectResponse = () => createSelector(selectBlogsDomain, state => state.get('response'));
const makeSelectXResponse = () => createSelector(selectBlogsDomain, state => state.get('xresponse'));
const makeSelectError = () => createSelector(selectBlogsDomain, state => state.get('error'));
const makeSelectRequesting = () => createSelector(selectBlogsDomain, state => state.get('requesting'));
const makeSelectImageUploadRes = () => createSelector(selectBlogsDomain, state => state.get('uploadResponse'));

export {
  selectBlogsDomain,
  makeSelectSuccess,
  makeSelectResponse,
  makeSelectError,
  makeSelectRequesting,
  makeSelectXResponse,
  makeSelectImageUploadRes
};
