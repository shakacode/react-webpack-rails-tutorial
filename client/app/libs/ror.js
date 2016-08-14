export default {

  getAuthenticityToken() {
    const token = document.querySelector('meta[name="csrf-token"]');
    return token ? token.content : null;
  },

  authenticityHeader(options = {}) {
    return Object.assign(options, {
      'X-CSRF-Token': this.getAuthenticityToken(),
      'X-Requested-With': 'XMLHttpRequest',
    });
  },

  checkStatus(res) {
    if (!(res.ok || res.status === 304)) {
      throw Error(res.statusText);
    }
    return res;
  },

  makeJsonPostHeader(entity) {
    return {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.getAuthenticityToken(),
      },
      body: JSON.stringify(entity),
      credentials: 'same-origin',
    };
  },
};
