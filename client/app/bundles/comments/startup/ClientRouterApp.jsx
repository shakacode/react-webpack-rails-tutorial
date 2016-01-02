import React from 'react';
import { Provider } from 'react-redux';
import Router from 'react-router';
import { browserHistory } from 'react-router';

import createStore from '../store/commentsStore';
import routes from '../routes/routes';

export default (props, location) => {
  const store = createStore(props);

  return (
    <Provider store={store}>
      <Router history={browserHistory} children={routes} />
    </Provider>
  );
};
