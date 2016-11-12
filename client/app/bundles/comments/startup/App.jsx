import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { InitI18n } from '../common/i18n';

import NonRouterCommentsContainer from '../containers/NonRouterCommentsContainer';

export default (_props, _railsContext) => {
  const store = ReactOnRails.getStore('commentsStore');

  InitI18n(_railsContext);

  return (
    <Provider store={store}>
      <NonRouterCommentsContainer />
    </Provider>
  );
};
