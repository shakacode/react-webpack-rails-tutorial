// Compare to ../ServerRelayRouterApp.jsx
import React from 'react';
import Relay from 'react-relay';
import { Router, applyRouterMiddleware, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import useRelay from 'react-router-relay';
import useNamedRoutes from 'use-named-routes';
import routes from '../routes/relay_routes';

export default (_props, _railsContext) => {
  const history = useNamedRoutes(useRouterHistory(createHistory))({ routes });
  const render = applyRouterMiddleware(useRelay);
  return (
    <Router
      history={history}
      render={render}
      environment={Relay.Store}
      children={routes}
      forceFetch
    />
  );
};

