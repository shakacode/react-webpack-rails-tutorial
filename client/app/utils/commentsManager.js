import request from 'axios';
import metaTagsManager from './metaTagsManager';

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
        'X-CSRF-Token': metaTagsManager.getCSRFToken(),
      },
      data: { comment },
    });
  },

};

export default CommentsManager;
