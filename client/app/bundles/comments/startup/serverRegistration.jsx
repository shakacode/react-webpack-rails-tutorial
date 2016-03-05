// Example of React + Redux
import App from './ServerApp';
import RouterApp from './ServerRouterApp';
import ReactOnRails from 'react-on-rails';
import NavigationBarApp from './NavigationBarApp';
import routerCommentsStore from '../store/routerCommentsStore';
import commentsStore from '../store/commentsStore';

ReactOnRails.register(
  {
    App,
    RouterApp,
    NavigationBarApp,
  }
);

ReactOnRails.registerStore({
  routerCommentsStore,
  commentsStore,
});
