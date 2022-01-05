// Compare to ../ClientRouterApp.jsx
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import ReactOnRails from 'react-on-rails';
import routes from '../routes/routes.jsx';

function ServerRouterApp(_props, railsContext) {
  const store = ReactOnRails.getStore('routerCommentsStore');

  let error;
  let redirectLocation;
  const { location } = railsContext;

  // This tell react_on_rails to skip server rendering any HTML. Note, client rendering
  // will handle the redirect. What's key is that we don't try to render.
  // Critical to return the Object properties to match this { error, redirectLocation }
  if (error || redirectLocation) {
    return { error, redirectLocation };
  }

  // Allows components to add properties to the object to store
  // information about the render.
  const context = {};

  // Important that you don't do this if you are redirecting or have an error.
  return (
    <Provider store={store}>
      <StaticRouter
        location={location}
        context={context}
      >
        {routes}
      </StaticRouter>
    </Provider>
  );
}

export default ServerRouterApp;
