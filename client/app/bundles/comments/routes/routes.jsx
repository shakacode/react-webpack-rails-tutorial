import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout.jsx';
import TestReactRouter from '../components/TestReactRouter/TestReactRouter.jsx';
import TestReactRouterRedirect from '../components/TestReactRouterRedirect/TestReactRouterRedirect.jsx';
import RouterCommentsContainer from '../containers/RouterCommentsContainer.jsx';

export default (
  <Layout>
    <Routes>
      <Route path="/" element={<RouterCommentsContainer />} />
      <Route path="react-router" element={<TestReactRouter />} />
      <Route path="react-router/redirect" element={<TestReactRouterRedirect />} />
    </Routes>
  </Layout>
);
