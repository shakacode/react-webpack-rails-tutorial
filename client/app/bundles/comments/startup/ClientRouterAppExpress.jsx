// Compare to ../ServerRouterApp.jsx
// This
import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { Router, browserHistory } from 'react-router';
import routes from '../routes/routes';
import { syncHistoryWithStore } from 'react-router-redux';

// No need for this file if using shared stores, but to make this example work for simple express
// server rendering, we only try get the shared store if the props were not passed.
// See https://github.com/shakacode/react_on_rails/issues/504
import createStore from '../store/routerCommentsStore';

const RouterAppExpress = (_props, _railsContext) => {

  // See comment above
  const store = createStore(_props);

  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(
    browserHistory,
    store
  );

  return (
    <Provider store={store}>
      <Router history={history} children={routes} />
    </Provider>
  );
};

ReactOnRails.register({
  RouterAppExpress,
});
