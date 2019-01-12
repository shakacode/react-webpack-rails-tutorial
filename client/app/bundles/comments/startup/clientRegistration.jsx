import ReactOnRails from 'react-on-rails';

import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import ja from 'react-intl/locale-data/ja';
import zh from 'react-intl/locale-data/zh';

import App from './App';
import RouterApp from './ClientRouterApp';
import SimpleCommentScreen from '../components/SimpleCommentScreen/SimpleCommentScreen';
import SimpleHooksCommentScreen from '../components/SimpleHooksCommentScreen/SimpleHooksCommentScreen';
import routerCommentsStore from '../store/routerCommentsStore';
import commentsStore from '../store/commentsStore';
import NavigationBarApp from './NavigationBarApp';

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
  SimpleHooksCommentScreen,
});

ReactOnRails.registerStore({
  routerCommentsStore,
  commentsStore,
});
