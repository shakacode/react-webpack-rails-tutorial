import ReactOnRails from 'react-on-rails';

import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import ja from 'react-intl/locale-data/ja';
import zh from 'react-intl/locale-data/zh';

import App from '../bundles/comments/startup/App';
import RouterApp from '../bundles/comments/startup/ClientRouterApp';
import SimpleCommentScreen from '../bundles/comments/components/SimpleCommentScreen/SimpleCommentScreen';
import routerCommentsStore from '../bundles/comments/store/routerCommentsStore';
import commentsStore from '../bundles/comments/store/commentsStore';
import NavigationBarApp from '../bundles/comments/startup/NavigationBarApp';

// Initizalize all locales for react-intl.
addLocaleData([...en, ...de, ...ja, ...zh]);

ReactOnRails.setOptions({
  traceTurbolinks: process.env.TRACE_TURBOLINKS, // eslint-disable-line no-undef
});

ReactOnRails.register({
  App,
  RouterApp,
  NavigationBarApp,
  SimpleCommentScreen,
});

ReactOnRails.registerStore({
  routerCommentsStore,
  commentsStore,
});
