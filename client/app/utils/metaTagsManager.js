const MetaTagsManager = {

  /**
   * Get CSRF Token from the DOM.
   *
   * @returns {String} - CSRF Token.
   */
  getCSRFToken() {
    const token = Array.from(document.getElementsByTagName('meta'))
      .find(tag => tag.name === 'csrf-token');

    return token ? token.content : null;
  },
};

export default MetaTagsManager;
