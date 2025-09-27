// Example of React + Redux
import ReactOnRails from 'react-on-rails';

import App from './App/ror_components/App';
import RouterApp from './RouterApp/ror_components/RouterApp.server';
import SimpleCommentScreen from '../components/SimpleCommentScreen/ror_components/SimpleCommentScreen';
import NavigationBarApp from './NavigationBarApp/ror_components/NavigationBarApp';
import routerCommentsStore from '../store/routerCommentsStore';
import commentsStore from '../store/commentsStore';
import Footer from '../components/Footer/ror_components/Footer';

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
