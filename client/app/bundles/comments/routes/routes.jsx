import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../layout/Layout';
import TestReactRouter from '../components/TestReactRouter/TestReactRouter';
import TestReactRouterRedirect from '../components/TestReactRouterRedirect/TestReactRouterRedirect';
import RouterCommentsContainer from '../containers/RouterCommentsContainer';
import checkAuth from '../util/checkAuth';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute
      component={RouterCommentsContainer}
    />
    <Route
      path="react-router"
      component={TestReactRouter}
    />
    <Route
      path="react-router/redirect"
      component={TestReactRouterRedirect}
      onEnter={checkAuth}
    />
  </Route>
);
