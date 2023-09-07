import ReactOnRails from 'react-on-rails';
import 'bootstrap-loader';
// eslint-disable-next-line import/no-webpack-loader-syntax
import 'expose-loader?exposes=$,jQuery!jquery';
import 'jquery-ujs';

import App from '../bundles/comments/startup/App';
import RouterApp from '../bundles/comments/startup/ClientRouterApp';
import SimpleCommentScreen from '../bundles/comments/components/SimpleCommentScreen/SimpleCommentScreen';
import routerCommentsStore from '../bundles/comments/store/routerCommentsStore';
import commentsStore from '../bundles/comments/store/commentsStore';
import NavigationBarApp from '../bundles/comments/startup/NavigationBarApp';
import Footer from '../bundles/comments/components/Footer/Footer';
import RescriptShow from '../bundles/comments/src/ReScriptShow.bs.mjs';

ReactOnRails.setOptions({
  // traceTurbolinks: process.env.TRACE_TURBOLINKS, // eslint-disable-line no-undef
  // process.env.TRACE_TURBOLINKS -> error: development is not defined
  traceTurbolinks: true,
});

ReactOnRails.register({
  App,
  RouterApp,
  NavigationBarApp,
  SimpleCommentScreen,
  Footer,
  RescriptShow,
});

ReactOnRails.registerStore({
  routerCommentsStore,
  commentsStore,
});
