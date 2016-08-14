import ReactOnRails from 'react-on-rails';

export default {

  checkStatus(res) {
    debugger;
    if (!(res.ok || res.status === 304)) {
      const e = Error(res.statusText);
      e.response = res;
      throw e;
    }
    return res;
  },

  makeJsonPostHeader(entity) {
    return {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken(),
      },
      body: JSON.stringify(entity),
      credentials: 'same-origin',
    };
  },
};
