import React from 'react';
import Immutable from 'immutable';
import request from 'axios';
import _ from 'lodash';

import metaTagsManager from 'libs/metaTagsManager';
import CommentForm from '../CommentBox/CommentForm/CommentForm';
import CommentList from '../CommentBox/CommentList/CommentList';

export default class SimpleCommentScreen extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      $$comments: Immutable.fromJS([]),
      ajaxSending: false,
      fetchCommentsError: null,
      submitCommentError: null,
    };

    _.bindAll(this, '_fetchComments', '_handleCommentSubmit');
  }

  componentDidMount() {
    this._fetchComments();
  }

  _fetchComments() {
    return (
      request
        .get('comments.json', { responseType: 'json' })
        .then(res => this.setState({ $$comments: Immutable.fromJS(res.data) }))
        .catch(error => this.setState({ fetchCommentsError: error }))
    );
  }

  _handleCommentSubmit(comment) {
    this.setState({ ajaxSending: true });

    const requestConfig = {
      responseType: 'json',
      headers: {
        'X-CSRF-Token': metaTagsManager.getCSRFToken(),
      },
    };

    return (
      request
        .post('comments.json', { comment }, requestConfig)
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
        })
    );
  }

  render() {
    return (
      <div className="commentBox container">
        <h2>Comments</h2>
        <p>
          Text take Github Flavored Markdown. Comments older than 24 hours are deleted.<br/>
          <b>Name</b> is preserved. <b>Text</b> is reset, between submits.
        </p>
        <CommentForm
          ajaxSending={this.state.ajaxSending}
          actions={{ submitComment: this._handleCommentSubmit }}
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
