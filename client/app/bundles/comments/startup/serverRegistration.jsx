// Example of React + Redux
import ReactOnRails from 'react-on-rails';

import App from './App';
import RouterApp from './ServerRouterApp';
import SimpleCommentScreen from '../components/SimpleCommentScreen/SimpleCommentScreen';
import NavigationBarApp from './NavigationBarApp';
import routerCommentsStore from '../store/routerCommentsStore';
import commentsStore from '../store/commentsStore';

ReactOnRails.register(
  {
    App,
    RouterApp,
    NavigationBarApp,
    SimpleCommentScreen,
  },
);

ReactOnRails.registerStore({
  routerCommentsStore,
  commentsStore,
});
