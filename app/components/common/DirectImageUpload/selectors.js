import { createSelector } from 'reselect';

const selectDomain = state => state.get('imageUpload');

const makeSelectSuccess = () =>
  createSelector(
    selectDomain,
    state => state.get('success'),
  );
const makeSelectResponse = () =>
  createSelector(
    selectDomain,
    state => state.get('response'),
  );
const makeSelectError = () =>
  createSelector(
    selectDomain,
    state => state.get('error'),
  );
const makeSelectRequesting = () =>
  createSelector(
    selectDomain,
    state => state.get('requesting'),
  );
const makeSelectImageUploadData = () =>
  createSelector(
    selectDomain,
    state => state.get('imageUploadResponse'),
  );
const makeSelectImageList = () =>
  createSelector(
    selectDomain,
    state => state.get('imageList'),
  );

export {
  makeSelectSuccess,
  makeSelectResponse,
  makeSelectError,
  makeSelectRequesting,
  makeSelectImageUploadData,
  makeSelectImageList,
};
