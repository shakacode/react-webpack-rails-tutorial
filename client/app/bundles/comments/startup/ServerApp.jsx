import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../store/commentsStore';
import NonRouterCommentsContainer from '../containers/NonRouterCommentsContainer';
import NavigationBarContainer from '../containers/NavigationBarContainer';

export default props => {
  const store = createStore(props);
  return (
      <Provider store={store}>
        <NonRouterCommentsContainer />
        <NavigationBarContainer />
      </Provider>
  );
};
