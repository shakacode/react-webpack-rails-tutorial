import $ from 'jquery';

const API_URL = 'comments.json';

const CommentsManager = {

  /**
   * Retrieve comments from server using AJAX call.
   *
   * @returns {Promise} - jqXHR result of ajax call.
   */
  fetchComments() {
    return Promise.resolve($.ajax({
      url: API_URL,
      dataType: 'json',
    }));
  },

  /**
   * Submit new comment to server using AJAX call.
   *
   * @param {Object} comment - Comment body to post.
   * @returns {Promise} - jqXHR result of ajax call.
   */
  submitComment(comment) {
    return Promise.resolve($.ajax({
      url: API_URL,
      dataType: 'json',
      type: 'POST',
      data: {comment: comment},
    }));
  },
};

export default CommentsManager;
