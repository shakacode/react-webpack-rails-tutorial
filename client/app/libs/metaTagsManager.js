import { find } from 'lodash/find';

export default {

  /**
   * Get CSRF Token from the DOM.
   *
   * @returns {String} - CSRF Token.
   */
  getCSRFToken() {
    const token = find(document.querySelectorAll('meta'), ['name', 'csrf-token']);
    return token ? token.content : null;
  },

};
