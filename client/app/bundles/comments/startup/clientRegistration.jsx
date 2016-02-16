import App from './ClientApp';
import RouterApp from './ClientRouterApp';
import Navigationbar from '../components/Navigationbar/Navigationbar';
import SimpleCommentScreen from '../components/SimpleCommentScreen/SimpleCommentScreen';
import ReactOnRails from 'react-on-rails';

ReactOnRails.setOptions({
  traceTurbolinks: TRACE_TURBOLINKS, // eslint-disable-line no-undef
});

ReactOnRails.register({
  App,
  RouterApp,
  SimpleCommentScreen,
  Navigationbar,
});
