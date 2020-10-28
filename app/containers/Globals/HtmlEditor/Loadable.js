import Loadable from 'routing/Loadable';
import LoadingIndicator from 'components/LoadingIndicator';
import loadable from 'loadable-components';

export default Loadable({
  loader: () => import('./index'),
  loading: LoadingIndicator
});
