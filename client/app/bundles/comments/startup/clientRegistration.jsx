import ReactOnRails from 'react-on-rails';

import App from './App';
import RouterApp from './ClientRouterApp';
import SagaApp from './SagaApp';
import SimpleCommentScreen from '../components/SimpleCommentScreen/SimpleCommentScreen';
import routerCommentsStore from '../store/routerCommentsStore';
import commentsStore from '../store/commentsStore';
import sagaCommentsStore from '../store/sagaCommentsStore';
import NavigationBarApp from './NavigationBarApp';

ReactOnRails.setOptions({
  traceTurbolinks: TRACE_TURBOLINKS, // eslint-disable-line no-undef
});

ReactOnRails.register({
  App,
  RouterApp,
  SagaApp,
  NavigationBarApp,
  SimpleCommentScreen,
});

ReactOnRails.registerStore({
  routerCommentsStore,
  commentsStore,
  sagaCommentsStore,
});
