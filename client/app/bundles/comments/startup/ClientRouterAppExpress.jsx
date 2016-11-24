// Compare to ../ServerRouterApp.jsx
import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from '../routes/routes';

// Because of https://github.com/shakacode/react_on_rails/issues/504
// we need to skip using a shared store for the express server startup.
import createStore from '../store/routerCommentsStore';

const RouterAppExpress = (_props, _railsContext) => {
  // See comment above
  const store = createStore(_props);

  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(
    browserHistory,
    store,
  );

  return (
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  );
};

ReactOnRails.register({
  RouterAppExpress,
});
