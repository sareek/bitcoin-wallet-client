import { createSelector } from 'reselect';

/**
 * Direct selector to the packageList state domain
 */

const selectPackageListDomain = state => state.cartList;

const makeSelectSuccess = () =>
  createSelector(
    selectPackageListDomain,
    state => state.get('success'),
  );
const makeSelectPackageResponse = () =>
  createSelector(
    selectPackageListDomain,
    state => state.get('response'),
  );
const makeSelectXResponse = () =>
  createSelector(
    selectPackageListDomain,
    state => state.get('xresponse'),
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
const makeSelectCart = () =>
  createSelector(
    selectPackageListDomain,
    state => state.get('cart'),
  );
const makeSelectSubscribedPackage = () =>
  createSelector(
    selectPackageListDomain,
    state => state.get('subscribedPackage'),
  );
const makeSelectCartInfo = () =>
  createSelector(
    selectPackageListDomain,
    state => state.get('cartInfo'),
  );
const makeSelectKhaltiResponse = () =>
  createSelector(
    selectPackageListDomain,
    state => state.get('khalti_response'),
  );

export {
  makeSelectSuccess,
  makeSelectXResponse,
  makeSelectPackageResponse,
  makeSelectError,
  makeSelectRequesting,
  makeSelectCart,
  makeSelectSubscribedPackage,
  makeSelectCartInfo,
  makeSelectKhaltiResponse,
};
