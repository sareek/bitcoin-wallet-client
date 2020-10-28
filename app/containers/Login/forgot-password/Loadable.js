// import Loadable from 'routing/Loadable';
// import LoadingIndicator from 'components/LoadingIndicator';
//
// export const handleLoadedModules = (injectReducer, injectSagas) => (
//   [ reducer, sagas, component]
// ) => {
//   injectReducer('loginForgotPassword', reducer.default);
//   injectSagas('loginForgotPasswordSaga', sagas.default);
//   return component;
// };
//
// export default Loadable({
//   loader: ({ injectReducer, injectSagas }) =>
//     Promise.all([ import('./reducer'), import('./sagas'), import('./index')]).then(
//       handleLoadedModules(injectReducer, injectSagas)
//     ),
//   loading: LoadingIndicator
// });
/**
 *
 * Asynchronously loads the component for {{ properCase name }}
 *
 */

// import Loadable from 'react-loadable';

// export default Loadable({
//   loader: () => import('./index'),
//   loading: () => null,
// });
import loadable from 'loadable-components';

export default loadable(() => import('./index'));

