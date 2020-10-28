import { createSelector } from 'reselect';

/**
 * Direct selector to the packageList state domain
 */

const selectPackageListDomain = state => state.popularPackageList;

const makeSelectSuccess = () =>
  createSelector(
    selectPackageListDomain,
    state => state.get('success'),
  );
const makeSelectSuccessResponse = () =>
  createSelector(
    selectPackageListDomain,
    state => state.get('response'),
  );
const makeSelectError = () =>
  createSelector(
    selectPackageListDomain,
    state => state.get('error'),
  );
const makeSelectRequesting = () =>
  createSelector(
    selectPackageListDomain,
    state => state.get('requesting'),
  );
const makeSelectCartPackage = () =>
  createSelector(
    selectPackageListDomain,
    state => state.get('packages'),
  );
const makeSelectPopularPackage = () =>
  createSelector(
    selectPackageListDomain,
    state => state.get('popularPackage'),
  );

export {
  makeSelectSuccess,
  makeSelectSuccessResponse,
  makeSelectError,
  makeSelectRequesting,
  makeSelectCartPackage,
  makeSelectPopularPackage,
};
