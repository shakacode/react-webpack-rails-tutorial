// Top level component for client side.
// Compare this to the ./ServerApp.jsx file which is used for server side rendering.

import { Provider } from 'react-redux';
import React from 'react';
import ReactOnRails from 'react-on-rails';

import NavigationBar from '../../../components/NavigationBar/NavigationBar.jsx';
import NavigationBarContainer from '../../../containers/NavigationBarContainer.jsx';
import * as paths from '../../../constants/paths';

/*
 *  Export a function that returns a ReactComponent, depending on a store named SharedReduxStore.
 *  This is used for the client rendering hook after the page html is rendered.
 *  React will see that the state is the same and not do anything.
 */
function NavigationBarAppFactory(_props, railsContext) {
  // This is where we get the existing store.
  const { pathname } = railsContext;
  let store;
  if (pathname === paths.ROUTER_PATH) {
    store = ReactOnRails.getStore('routerCommentsStore', false);
  } else if (pathname === paths.NO_ROUTER_PATH) {
    store = ReactOnRails.getStore('commentsStore', false);
  } else {
    return function NavigationBarApp() {
      return <NavigationBar {...{ pathname }} />;
    };
  }

  // eslint interprets the return as a new component definition, which is not the case
  // eslint-disable-next-line react/display-name, react/no-unstable-nested-components
  return function NavigationBarApp() {
    return (
      <Provider store={store}>
        <NavigationBarContainer />
      </Provider>
    );
  };
}

export default NavigationBarAppFactory;
