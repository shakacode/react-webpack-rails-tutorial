import React from 'react';
import { Provider } from 'react-redux';
import createStore from '../store/commentsStore';
import NonRouterCommentsContainer from '../containers/NonRouterCommentsContainer';

export default props => {
  const store = createStore(props);

  if (process.env.NODE_ENV !== 'production') {
    const showDevTools = require('../containers/showDevTools');
    showDevTools(store);
  }

  return (
      <Provider store={store}>
        <NonRouterCommentsContainer />
      </Provider>
  );
};
