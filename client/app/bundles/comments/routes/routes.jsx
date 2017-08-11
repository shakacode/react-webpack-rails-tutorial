import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../layout/Layout';
import TestReactRouter from '../components/TestReactRouter/TestReactRouter';
import TestReactRouterRedirect from '../components/TestReactRouterRedirect/TestReactRouterRedirect';
import RouterCommentsContainer from '../containers/RouterCommentsContainer';

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
