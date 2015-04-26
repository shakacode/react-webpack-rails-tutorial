import $ from 'jquery';
import React from 'react';
import CommentBox from './components/CommentBox';

$(function onLoad() {
  function render() {
    if ($('#content').length > 0) {
      React.render(
        <div>
          <CommentBox url='comments.json' pollInterval={5000}/>

          <div className='container'>
            <a href='http://www.railsonmaui.com'>
              <h3 className='open-sans-light'>
                <div className='logo'/>
                Example of styling using image-url and Open Sans Light custom font
              </h3>
            </a>
            <a href='https://twitter.com/railsonmaui'>
              <div className='twitter-image'/>
              Rails On Maui on Twitter
            </a>
          </div>
        </div>,
        document.getElementById('content')
      );
    }
  }

  render();

  // Next part is to make this work with turbo-links
  $(document).on('page:change', () => {
    render();
  });
});
