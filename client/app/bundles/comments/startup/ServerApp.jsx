import React from 'react';
import { Provider } from 'react-redux';
import NonRouterCommentsContainer from '../containers/NonRouterCommentsContainer';
import NavigationBarContainer from '../containers/NavigationBarContainer';

export default (_props, _railsContext) => {
  const store = ReactOnRails.getStore('commentsStore');
  return (
    <Provider store={store}>
      <NavigationBarContainer />
      <NonRouterCommentsContainer />
    </Provider>
  );
};
