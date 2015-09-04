import React from 'react';
import { Route } from 'react-router';
import Layout from '../layouts/Layout';
import About from '../components/About';
import CommentScreen from '../components/CommentScreen';

export default (
  <Route component={Layout}>
    <Route path='/' component={CommentScreen} />
    <Route path='about' component={About} />
  </Route>
);
