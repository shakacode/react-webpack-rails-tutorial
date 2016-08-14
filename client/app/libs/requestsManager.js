import fetch from 'isomorphic-fetch';
import ror from './ror';

const API_URL = 'comments.json';

export default {

  /**
   * Retrieve list of entities from server using AJAX call.
   *
   * @returns {Promise} - Result of ajax call.
   */
  fetchEntities() {
    return (fetch(API_URL)
      .then(res => ror.checkStatus(res))
      .then(res => res.json())
      .then(res => ({ data: res }))
    );
  },

  /**
   * Submit new entity to server using AJAX call.
   *
   * @param {Object} entity - Request body to post.
   * @returns {Promise} - Result of ajax call.
   */
  submitEntity(entity) {
    return (fetch(API_URL, ror.makeJsonPostHeader(entity))
      .then(res => ror.checkStatus(res))
      .then(res => res.json())
      .then(res => ({ data: res }))
    );
  },
};
