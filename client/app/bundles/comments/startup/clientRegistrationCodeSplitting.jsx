import ReactOnRails from 'react-on-rails';

import App from './App';
import RouterApp from './ClientRouterAppRenderer';
import SimpleCommentScreen from '../components/SimpleCommentScreen/SimpleCommentScreen';
import routerCommentsStore from '../store/routerCommentsStore';
import commentsStore from '../store/commentsStore';
import NavigationBarApp from './NavigationBarApp';

ReactOnRails.setOptions({
  traceTurbolinks: TRACE_TURBOLINKS, // eslint-disable-line no-undef
});

ReactOnRails.register({
  App,
  NavigationBarApp,
  SimpleCommentScreen,
});

ReactOnRails.registerRenderer({
  RouterApp,
});

ReactOnRails.registerStore({
  routerCommentsStore,
  commentsStore,
});
