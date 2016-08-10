import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import NonRouterCommentsContainer from '../containers/NonRouterCommentsContainer';

export default (_props, _railsContext) => {
  const store = ReactOnRails.getStore('commentsStore');

  return (
    <Provider store={store}>
      <NonRouterCommentsContainer />
    </Provider>
  );
};
