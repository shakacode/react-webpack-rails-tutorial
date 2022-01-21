import ReactOnRails from 'react-on-rails';
import 'bootstrap-loader';
import 'jquery-ujs';
import controllers from '../controllers';

import App from '../bundles/comments/startup/App';
import RouterApp from '../bundles/comments/startup/ClientRouterApp';
import SimpleCommentScreen from '../bundles/comments/components/SimpleCommentScreen/SimpleCommentScreen';
import StimulusCommentScreen from '../bundles/comments/components/StimulusCommentScreen/StimulusCommentScreen';
import routerCommentsStore from '../bundles/comments/store/routerCommentsStore';
import commentsStore from '../bundles/comments/store/commentsStore';
import NavigationBarApp from '../bundles/comments/startup/NavigationBarApp';

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
  StimulusCommentScreen,
});

ReactOnRails.registerStore({
  routerCommentsStore,
  commentsStore,
});
