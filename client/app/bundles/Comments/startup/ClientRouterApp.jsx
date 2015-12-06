import React from 'react';
import { Provider } from 'react-redux';
import Router from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';

import createStore from '../stores/commentsStore';
import routes from '../routes/routes';

const RouterApp = (props, location) => {
  const store = createStore(props);
  const history = createHistory();

  return (
    <Provider store={store}>
      <Router history={history} children={routes} />
    </Provider>
  );
};

// Export is needed for the hot reload server
export default RouterApp;
