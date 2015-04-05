import $ from 'jquery';

const CommentsManager = {
  /**
   * Retrieves comments from backend server using AJAX call.
   *
   * @param {String} url
   * @return {Array}
   */
  fetchComments(url) {
    return $.ajax({
      url: url,
      dataType: 'json'
    });
  },

  submitComment(url, comment) {
    return $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: { comment: comment }
      /**
      .then(data => {
        var comments = this.state.data;
        var newComments = React.addons.update(comments, { $push: [comment] } );
        this.setState({ajaxSending: false, data: newComments, formData: this.emptyFormData });
      }, (xhr, status, err) => {
        this.logError(xhr, status, err);
        this.setState({ajaxSending: false});
      */
    });
  }

  /**
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json'}).then(data => {
        this.setState({data: data});
      }, this.logError);
  },

  emptyFormData: { author: "", text: "" },

  handleCommentSubmit: function() {
    // `setState` accepts a callback. To avoid (improbable) race condition,
    // we'll send the ajax request right after we optimistically set the new
    // state.
    this.setState({ajaxSending: true});
    var comment = this.state.formData;
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: { comment: comment}}).then(data => {
        var comments = this.state.data;
        var newComments = React.addons.update(comments, { $push: [comment] } );
        this.setState({ajaxSending: false, data: newComments, formData: this.emptyFormData });
      }, (xhr, status, err) => {
        this.logError(xhr, status, err);
        this.setState({ajaxSending: false});
    });
  },
  */

};

export default CommentsManager;
