const API_URL = 'comments.json';

// fetch won't reject on HTTP error status
// https://github.com/github/fetch#handling-http-error-statuses
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const CommentsManager = {

  /**
   * Retrieve comments from server using AJAX call.
   *
   * @returns {Promise} - response of fetch request.
   */
  fetchComments() {
    return fetch(API_URL).then(checkStatus).then(parseJSON);
  },

  /**
   * Submit new comment to server using AJAX call.
   *
   * @param {Object} comment - Comment body to post.
   * @returns {Promise} - response of fetch request.
   */

  submitComment(comment) {
    return fetch(API_URL, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({comment}),
    }).then(checkStatus).then(parseJSON);
  },
};

export default CommentsManager;
