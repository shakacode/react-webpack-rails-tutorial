// Example of React + Redux
import ReactOnRails from 'react-on-rails';

import App from './App';
import RouterApp from './ServerRouterApp';
import SimpleCommentScreen from '../components/SimpleCommentScreen/SimpleCommentScreen';
import StimulusCommentScreen from '../components/StimulusCommentScreen/StimulusCommentScreen';
import NavigationBarApp from './NavigationBarApp';
import routerCommentsStore from '../store/routerCommentsStore';
import commentsStore from '../store/commentsStore';
import Footer from '../components/Footer/Footer';

ReactOnRails.register({
  App,
  RouterApp,
  NavigationBarApp,
  SimpleCommentScreen,
  Footer,
  StimulusCommentScreen,
});

ReactOnRails.registerStore({
  routerCommentsStore,
  commentsStore,
});
