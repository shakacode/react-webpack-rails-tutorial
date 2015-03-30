var alt = require('../flux_alt');

class CommentStore {
  constructor() {
    this.comments = [];
  }

  handleAddComment(comment) {
    this.comments = comment;
  }
}

module.exports = alt.createStore(CommentStore, 'CommentStore');
