// @flow
import React from 'react';
import { Provider } from 'react-redux';
import store from './setup/store';
import Router from './setup/Router/Router';

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
