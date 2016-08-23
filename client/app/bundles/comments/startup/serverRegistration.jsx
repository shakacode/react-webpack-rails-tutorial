// Example of React + Redux
import ReactOnRails from 'react-on-rails';

import App from './App';
import RouterApp from './ServerRouterApp';
import SagaApp from './SagaApp';
import SimpleCommentScreen from '../components/SimpleCommentScreen/SimpleCommentScreen';
import NavigationBarApp from './NavigationBarApp';
import routerCommentsStore from '../store/routerCommentsStore';
import commentsStore from '../store/commentsStore';
import sagaCommentsStore from '../store/sagaCommentsStore';

ReactOnRails.register(
  {
    App,
    RouterApp,
    SagaApp,
    NavigationBarApp,
    SimpleCommentScreen,
  }
);

ReactOnRails.registerStore({
  routerCommentsStore,
  commentsStore,
  sagaCommentsStore,
});
