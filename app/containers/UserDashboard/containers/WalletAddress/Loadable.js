import loadable from 'loadable-components';

export default loadable({
  loader: () => import('./index'),
});