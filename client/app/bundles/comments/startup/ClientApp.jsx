import React from 'react';
import { Provider } from 'react-redux';

import NonRouterCommentsContainer from '../containers/NonRouterCommentsContainer';

export default props => {
  const store = ReactOnRails.getStore('commentsStore');

  return (
      <Provider store={store}>
        <NonRouterCommentsContainer />
      </Provider>
  );
};
