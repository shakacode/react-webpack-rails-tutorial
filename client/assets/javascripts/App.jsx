import $ from 'jquery';

import React from 'react';
import { Provider } from 'react-redux';

import CommentScreen from './components/CommentScreen';
import CommentStore from './stores/CommentStore';

$(function onLoad() {
  function render() {
    if ($('#content').length > 0) {
      React.render((
        <Provider store={CommentStore}>
          { () => <CommentScreen /> }
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
