import App from './ClientApp';
import RouterApp from './ClientRouterApp';
import Navigationbar from '../components/Navigationbar/Navigationbar';
import SimpleCommentScreen from '../components/SimpleCommentScreen/SimpleCommentScreen';
import routerCommentsStore from '../store/routerCommentsStore';
import ReduxSharedStoreApp from './ClientReduxSharedStoreApp';
import ReactOnRails from 'react-on-rails';

ReactOnRails.setOptions({
  traceTurbolinks: TRACE_TURBOLINKS, // eslint-disable-line no-undef
});

ReactOnRails.register({
  App,
  RouterApp,
  ReduxSharedStoreApp,
  SimpleCommentScreen,
  Navigationbar,
});

ReactOnRails.registerStore({
  routerCommentsStore,
});
