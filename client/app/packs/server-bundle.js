// Example of React + Redux
import ReactOnRails from 'react-on-rails';

import App from '../bundles/comments/startup/App';
import RouterApp from '../bundles/comments/startup/ServerRouterApp';
import SimpleCommentScreen from '../bundles/comments/components/SimpleCommentScreen/SimpleCommentScreen';
import NavigationBarApp from '../bundles/comments/startup/NavigationBarApp';
import routerCommentsStore from '../bundles/comments/store/routerCommentsStore';
import commentsStore from '../bundles/comments/store/commentsStore';
import StimulusApp from '../bundles/comments/startup/StimulusApp';

ReactOnRails.register(
  {
    App,
    RouterApp,
    NavigationBarApp,
    SimpleCommentScreen,
    StimulusApp,
  },
);

ReactOnRails.registerStore({
  routerCommentsStore,
  commentsStore,
});
