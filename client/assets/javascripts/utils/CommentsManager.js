import $ from 'jquery';

const CommentsManager = {
  /**
   * Retrieve comments from server using AJAX call.
   *
   * @param {String} url - Url of server to retrieve comments.
   * @returns {Deferred} - jqXHR result of ajax call.
   */
  fetchComments(url) {
    return $.ajax({
      url: url,
      dataType: 'json',
    });
  },

  /**
   * Submit new comment to server using AJAX call.
   *
   * @param {String} url - Url of where to post comment.
   * @param {Object} comment - Comment body to post.
   * @returns {Deferred} - jqXHR result of ajax call.
   */
  submitComment(url, comment) {
    return $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: {comment: comment},
    });
  },
};

export default CommentsManager;
