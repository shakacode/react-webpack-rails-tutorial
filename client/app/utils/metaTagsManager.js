import _find from 'lodash/collection/find';

const MetaTagsManager = {

  /**
   * Get CSRF Token from the DOM.
   *
   * @returns {String} - CSRF Token.
   */
  getCSRFToken() {
    const token = _find(document.querySelectorAll('meta'), 'name', 'csrf-token');
    return token ? token.content : null;
  },
};

export default MetaTagsManager;
