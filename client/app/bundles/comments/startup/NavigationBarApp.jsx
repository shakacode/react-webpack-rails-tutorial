// Top level component for client side.
// Compare this to the ./ServerApp.jsx file which is used for server side rendering.

import React from 'react';
import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import NavigationBarContainer from '../containers/NavigationBarContainer';
import * as paths from '../constants/paths';

/*
 *  Export a function that returns a ReactComponent, depending on a store named SharedReduxStore.
 *  This is used for the client rendering hook after the page html is rendered.
 *  React will see that the state is the same and not do anything.
 */
export default (_props, railsContext) => {
  // This is where we get the existing store.
  const { pathname } = railsContext;
  let store;
  if (pathname === paths.ROUTER_PATH) {
    store = ReactOnRails.getStore('routerCommentsStore', false);
  } else if (pathname === paths.NO_ROUTER_PATH) {
    store = ReactOnRails.getStore('commentsStore', false);
  } else {
    return (
      <NavigationBar {...{ pathname }} />
    );
  }

  return (
    <Provider store={store}>
      <NavigationBarContainer />
    </Provider>
  );
};
