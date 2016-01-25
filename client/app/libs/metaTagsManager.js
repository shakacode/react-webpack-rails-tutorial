import _ from 'lodash';

export default {

  /**
   * Get CSRF Token from the DOM.
   *
   * @returns {String} - CSRF Token.
   */
  getCSRFToken() {
    const token = _.find(document.querySelectorAll('meta'), ['name', 'csrf-token']);
    return token ? token.content : null;
  },

};
