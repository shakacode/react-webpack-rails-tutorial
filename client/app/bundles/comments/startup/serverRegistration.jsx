// Example of React + Redux
import App from './ServerApp';
import RouterApp from './ServerRouterApp';
import ReactOnRails from 'react-on-rails';
import Navigationbar from '../components/Navigationbar/Navigationbar';
import routerCommentsStore from '../store/routerCommentsStore';
import ReduxSharedStoreApp from './ServerReduxSharedStoreApp';

ReactOnRails.register(
  {
    App,
    RouterApp,
    ReduxSharedStoreApp,
    Navigationbar,
  }
);

ReactOnRails.registerStore({
  routerCommentsStore,
});
