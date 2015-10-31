import React from 'react';
import Immutable from 'immutable';
import request from 'axios';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import metaTagsManager from '../utils/metaTagsManager';

class SimpleCommentScreen extends React.Component {
  state = {
    $$comments: Immutable.fromJS([]),
    ajaxSending: false,
    fetchCommentsError: null,
    submitCommentError: null,
  };

  static displayName = 'SimpleCommentScreen';

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments() {
    return request.get('comments.json', { responseType: 'json' })
      .then(res => this.setState({ $$comments: Immutable.fromJS(res.data) }))
      .catch(error => this.setState({ fetchCommentsError: error }));
  }

  handleCommentSubmit = (comment) => {
    this.setState({ ajaxSending: true });

    const requestConfig = {
      responseType: 'json',
      headers: {
        'X-CSRF-Token': metaTagsManager.getCSRFToken(),
      },
    };

    return request.post('comments.json', { comment }, requestConfig)
      .then(() => {
        const { $$comments } = this.state;
        const $$comment = Immutable.fromJS(comment);

        this.setState({
          $$comments: $$comments.push($$comment),
          ajaxSending: false,
        });
      })
      .catch(error => {
        this.setState({
          submitCommentError: error,
          ajaxSending: false,
        });
      });
  };

  render() {
    return (
      <div className="commentBox container">
        <h2>Comments</h2>
        <p>
          Text take Github Flavored Markdown. Comments older than 24 hours are deleted.
          <b> Name</b> is preserved, <b>Text</b> is reset, between submits.
        </p>
        <CommentForm
          ajaxSending={this.state.ajaxSending}
          actions={{ submitComment: this.handleCommentSubmit}}
          error={this.state.submitCommentError}
        />
        <CommentList
          $$comments={this.state.$$comments}
          error={this.state.fetchCommentsError}
        />
      </div>
    );
  }
}

export default SimpleCommentScreen;
