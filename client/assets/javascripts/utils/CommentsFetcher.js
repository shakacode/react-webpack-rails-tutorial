import $ from 'jquery';

const CommentsFetcher = {
  /**
   * Retrieves comments from backend server using AJAX call.
   *
   * @param {String} url
   * @return {Array}
   */
  fetch(url) {
    return $.ajax({
      url: url,
      dataType: 'json'
    })
  }
};

export default CommentsFetcher;
