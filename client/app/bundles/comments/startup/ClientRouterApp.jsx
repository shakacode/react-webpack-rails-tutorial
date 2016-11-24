// Compare to ../ServerRouterApp.jsx
import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory } from 'react-router';

import routes from '../routes/routes';

export default (_props, _railsContext) => {
  const store = ReactOnRails.getStore('routerCommentsStore');

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
