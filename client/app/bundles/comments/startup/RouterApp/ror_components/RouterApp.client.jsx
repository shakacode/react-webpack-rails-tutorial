// Compare to ./RouterApp.server.jsx
import { Provider } from 'react-redux';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import { BrowserRouter } from 'react-router-dom';
import routes from '../../../routes/routes.jsx';

function ClientRouterApp(_props) {
  const store = ReactOnRails.getStore('routerCommentsStore');

  // eslint-disable-next-line react/display-name
  return (
    <Provider store={store}>
      <BrowserRouter>{routes}</BrowserRouter>
    </Provider>
  );
}

export default ClientRouterApp;
