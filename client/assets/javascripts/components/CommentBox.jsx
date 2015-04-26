import $ from 'jquery';
import React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import CommentStore from '../stores/CommentStore';
import FormStore from '../stores/FormStore';
import CommentActions from '../actions/CommentActions';
import FormActions from '../actions/FormActions';

const CommentBox = React.createClass({
  displayName: 'CommentBox',

  propTypes: {
    url: React.PropTypes.string.isRequired,
    pollInterval: React.PropTypes.number.isRequired
  },

  getStoreState() {
    return {
      comments: CommentStore.getState(),
      form: FormStore.getState()
    };
  },

  getInitialState() {
    return this.getStoreState();
  },

  componentDidMount() {
    CommentStore.listen(this.onChange);
    FormStore.listen(this.onChange);
    CommentActions.fetchComments(this.props.url, true);
    setInterval(CommentActions.fetchComments,
                this.props.pollInterval,
                this.props.url,
                false);
  },

  componentWillUnmount() {
    CommentStore.unlisten(this.onChange);
    FormStore.unlisten(this.onChange);
  },

  onChange() {
    this.setState(this.getStoreState());
  },

  render() {
    return (
      <div className="commentBox container">
        <h1>Comments { this.state.form.ajaxSending ? 'SENDING AJAX REQUEST!' : '' }</h1>
        <CommentForm formData={this.state.form.comment}
                     url={this.props.url}
                     ajaxSending={this.state.form.ajaxSending} />
        <CommentList comments={this.state.comments.comments} />
      </div>
    );
  }
});

export default CommentBox;
