import React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const CommentBox = React.createClass({
  displayName: 'CommentBox',

  propTypes: {
    pollInterval: React.PropTypes.number.isRequired,
    actions: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  },

  componentDidMount() {
    const { fetchComments } = this.props.actions;
    fetchComments();
    setInterval(fetchComments,
      this.props.pollInterval);
  },

  ajaxCounter() {
    return this.props.data.get('ajaxCounter');
  },

  isSendingAjax() {
    return this.ajaxCounter() > 0;
  },

  render() {
    const { actions, data } = this.props;

    return (
      <div className='commentBox container'>
        <h1>
          Comments { this.isSendingAjax() ? `SENDING AJAX REQUEST! Ajax Counter is ${this.ajaxCounter()}` : '' }
        </h1>
        <p>
          Text take Github Flavored Markdown. Comments older than 24 hours are deleted.
          <b>Name</b> is preserved, <b>Text</b> is reset, between submits.</p>
        <CommentForm
          ajaxSending={this.isSendingAjax()}
          error={data.get('submitCommentError')}
          actions={actions}/>
        <CommentList
          comments={data.get('comments')}
          error={data.get('fetchCommentError')}/>
      </div>
    );
  },
});

export default CommentBox;
