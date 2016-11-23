import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { syncHistoryWithStore } from 'react-router-redux';
import { match, Router, browserHistory } from 'react-router';

import routes from '../routes/codeSplittingRoutes';

export default (_props, _railsContext, domNodeId) => {
  const store = ReactOnRails.getStore('routerCommentsStore');

  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(
    browserHistory,
    store
  );

  // It's necessary to render ourselves because we're using code splitting,
  // and we might have to wait for a code chunk to be fetched from the server.
  // If we used the normal ReactOnRails.register API, we might get a
  // client/server render mismatch.
  match({ routes, history }, (error, redirectionLocation, renderProps) => {
    if (error) {
      throw error;
    }

    const reactElement = (
      <Provider store={store}>
        <Router {...renderProps} />
      </Provider>
    );

    render(reactElement, document.getElementById(domNodeId));
  });
};

