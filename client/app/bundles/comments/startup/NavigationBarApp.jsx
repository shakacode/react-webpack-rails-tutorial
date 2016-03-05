// Top level component for client side.
// Compare this to the ./ServerApp.jsx file which is used for server side rendering.

import React from 'react';
import ReactOnRails from 'react-on-rails';
import NavigationBarContainer from '../containers/NavigationBarContainer';
import { Provider } from 'react-redux';

/*
 *  Export a function that returns a ReactComponent, depending on a store named SharedReduxStore.
 *  This is used for the client rendering hook after the page html is rendered.
 *  React will see that the state is the same and not do anything.
 */
export default () => {
  // This is where we get the existing store.
  const stores = ReactOnRails.stores();
  let store;
  if (stores.has('routerCommentsStore')) {
    store = ReactOnRails.getStore('routerCommentsStore');
    return (
      <Provider store={store}>
        <NavigationBarContainer />
      </Provider>
      );
  } else if (stores.has('commentsStore')) {
    store = ReactOnRails.getStore('commentsStore');
    return (
      <Provider store={store}>
        <NavigationBarContainer />
      </Provider>
      );
  } else {
    return (
      <NavigationBarContainer />
    );
  }
};
