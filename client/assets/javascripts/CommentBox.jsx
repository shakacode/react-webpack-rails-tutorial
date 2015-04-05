'use strict';
import $ from 'jquery';
import React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

var CommentBox = React.createClass({
  displayName: 'CommentBox',
  propTypes: {
    url: React.PropTypes.string.isRequired,
    pollInterval: React.PropTypes.number.isRequired
  },

  logError: function(xhr, status, err) {
    console.error(`Error loading comments from server!\nURL is ${this.props.url}\nstatus is` +
    `${status}\nerr is ${err.toString()}`);
  },

  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json'
    }).then(data => {
      this.setState({data: data});
    }, this.logError);
  },

  emptyFormData: {author: '', text: ''},

  handleCommentSubmit: function() {
    // `setState` accepts a callback. To avoid (improbable) race condition,
    // `we'll send the ajax request right after we optimistically set the new
    // `state.
    var comment = this.state.formData;
    this.setState({ajaxSending: true});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: {comment: comment}
    }).then(data => { // Server returns all data
      const newComment = data;
      const oldComments = this.state.data;
      var newComments = React.addons.update(oldComments, {$push: [newComment]});
      this.setState({ajaxSending: false, data: newComments, formData: this.emptyFormData});
    }, (xhr, status, err) => {
      this.logError(xhr, status, err);
      this.setState({ajaxSending: false});
    });
  },

  getInitialState: function() {
    return {
      data: [],
      formData: this.emptyFormData,
      ajaxSending: false
    };
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  onFormChange: function(obj) {
    this.setState({
      formData: obj
    });
  },

  render: function() {
    return (
      <div className='commentBox container'>
        <h1>Comments { this.state.ajaxSending ? 'AJAX SENDING!' : '' }</h1>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} formData={this.state.formData}
                     onChange={this.onFormChange} ajaxSending={this.state.ajaxSending}/>
        <CommentList data={this.state.data}/>
      </div>
    );
  }
});

export default CommentBox
