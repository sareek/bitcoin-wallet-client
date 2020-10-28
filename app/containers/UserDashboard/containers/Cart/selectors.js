import { createSelector } from 'reselect';

export const getCartProducts = state => state.cartProduct;

const makeSelectResponse = () =>
  createSelector(
    getCartProducts,
    state => state.get('response'),
  );
  const makeSelectReportList = () =>
  createSelector(
    getCartProducts,
    state => state.get('reportList'),
  );
const makeSelectError = () =>
  createSelector(
    getCartProducts,
    state => state.get('error'),
  );
const makeSelectLoading = () =>
  createSelector(
    getCartProducts,
    state => state.get('loading'),
  );

  const makeSelectPublicURL = () =>
  createSelector(
    getCartProducts,
    state => state.get('public_url'),
  );
  const makeSelectCartProducts = () =>
  createSelector(
    getCartProducts,
    state => state.get('cartProductList'),
  );
  const makeSelectpaymentSuccessData = () =>
  createSelector(
    getCartProducts,
    state => state.get('paymentSuccessData')
  );

export {
  makeSelectResponse,
  makeSelectError,
  makeSelectLoading,
  makeSelectReportList,
  makeSelectPublicURL,
  makeSelectCartProducts,
  makeSelectpaymentSuccessData
};
