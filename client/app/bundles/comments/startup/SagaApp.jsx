import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import SagaCommentsContainer from '../containers/SagaCommentsContainer';
import rootSaga from '../store/sagas';

export default (_props, _railsContext) => {
  const store = ReactOnRails.getStore('sagaCommentsStore');
  store.runSaga(rootSaga);

  return (
    <Provider store={store}>
      <SagaCommentsContainer />
    </Provider>
  );
};
