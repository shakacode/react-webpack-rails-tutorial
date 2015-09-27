import request from 'axios';

const API_URL = 'comments.json';

const CommentsManager = {

  /**
   * Retrieve comments from server using AJAX call.
   *
   * @returns {Promise} - result of ajax call.
   */
  fetchComments() {
    return request({
      method: 'GET',
      url: API_URL,
      responseType: 'json',
    });
  },

  /**
   * Submit new comment to server using AJAX call.
   *
   * @param {Object} comment - Comment body to post.
   * @returns {Promise} - result of ajax call.
   */
  submitComment(comment) {
    return request({
      method: 'POST',
      url: API_URL,
      responseType: 'json',
      headers: {
        'X-CSRF-Token': this.getCSRFToken(),
      },
      data: { comment },
    });
  },

  /**
   * Get CSRF Token from the DOM.
   *
   * @returns {String} - CSRF Token.
   */
  getCSRFToken() {
    const metas = document.getElementsByTagName('meta');
    for (let i = 0; i < metas.length; i++) {
      const meta = metas[i];
      if (meta.getAttribute('name') === 'csrf-token') {
        return meta.getAttribute('content');
      }
    }

    return null;
  },

};

export default CommentsManager;
