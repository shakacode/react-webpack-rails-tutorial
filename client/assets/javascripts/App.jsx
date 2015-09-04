import $ from 'jquery';

import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';

import CommentStore from './stores/CommentStore';
import routes from './routes/routes';

$(function onLoad() {
  function render() {
    if ($('#content').length > 0) {
      React.render((
        <Provider store={CommentStore}>
          { () => <Router history={history} children={routes} /> }
        </Provider>
      ), document.getElementById('content'));
    }
  }

  render();

  // Next part is to make this work with turbo-links
  $(document).on('page:change', () => {
    render();
  });
});
