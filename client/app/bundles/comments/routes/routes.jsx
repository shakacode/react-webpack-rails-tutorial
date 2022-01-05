import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../layout/Layout.jsx';
import TestReactRouter from '../components/TestReactRouter/TestReactRouter.jsx';
import TestReactRouterRedirect from '../components/TestReactRouterRedirect/TestReactRouterRedirect.jsx';
import RouterCommentsContainer from '../containers/RouterCommentsContainer.jsx';

export default (
  <Layout>
    <Switch>
      <Route
        path="/"
        component={RouterCommentsContainer}
        exact
      />
      <Route
        path="/react-router"
        component={TestReactRouter}
        exact
      />
      <Route
        path="/react-router/redirect"
        component={TestReactRouterRedirect}
      />
    </Switch>
  </Layout>
);
