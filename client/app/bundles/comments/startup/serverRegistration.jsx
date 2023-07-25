// Example of React + Redux
import ReactOnRails from 'react-on-rails';

import App from './App.jsx';
import RouterApp from './ServerRouterApp.jsx';
import SimpleCommentScreen from '../components/SimpleCommentScreen/SimpleCommentScreen.jsx';
import NavigationBarApp from './NavigationBarApp.jsx';
import routerCommentsStore from '../store/routerCommentsStore';
import commentsStore from '../store/commentsStore';
import Footer from '../components/Footer/Footer';

ReactOnRails.register({
  App,
  RouterApp,
  NavigationBarApp,
  SimpleCommentScreen,
  Footer,
});

ReactOnRails.registerStore({
  routerCommentsStore,
  commentsStore,
});
