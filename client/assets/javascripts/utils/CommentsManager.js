import $ from 'jquery';

const CommentsManager = {
  /**
   * Retrieve comments from server using AJAX call.
   *
   * @param {String} url
   * @return Object
   */
  fetchComments(url) {
    return $.ajax({
      url: url,
      dataType: 'json'
    });
  },

  /**
   * Submit new comment to server using AJAX call.
   *
   * @param {String} url
   * @param {Object} comment
   * @return Object
   */
  submitComment(url, comment) {
    return $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: { comment: comment }
    });
  }
};

export default CommentsManager;
