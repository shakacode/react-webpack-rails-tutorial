import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import NonRouterCommentsContainer from '../containers/NonRouterCommentsContainer';
import rootSaga from '../store/sagas';

export default (_props, _railsContext) => {
  const store = ReactOnRails.getStore('commentsStore');
  store.runSaga(rootSaga);

  return (
    <Provider store={store}>
      <NonRouterCommentsContainer />
    </Provider>
  );
};
