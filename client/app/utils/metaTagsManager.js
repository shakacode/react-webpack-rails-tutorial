const MetaTagsManager = {

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

export default MetaTagsManager;
