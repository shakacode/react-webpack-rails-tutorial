import request from 'axios';
import Immutable from 'immutable';
import _ from 'lodash';
import React from 'react';
import ReactOnRails from 'react-on-rails';

import BaseComponent from 'libs/components/BaseComponent';

import CommentForm from '../CommentBox/CommentForm/CommentForm';
import CommentList from '../CommentBox/CommentList/CommentList';
import css from './SimpleCommentScreen.scss';

export default class SimpleCommentScreen extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      $$comments: Immutable.fromJS([]),
      isSaving: false,
      fetchCommentsError: null,
      submitCommentError: null,
    };

    _.bindAll(this, 'fetchComments', 'handleCommentSubmit');
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments() {
    return (
      request
        .get('comments.json', { responseType: 'json' })
        .then(res => this.setState({ $$comments: Immutable.fromJS(res.data.comments) }))
        .catch(error => this.setState({ fetchCommentsError: error }))
    );
  }

  handleCommentSubmit(comment) {
    this.setState({ isSaving: true });

    const requestConfig = {
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
    };

    return (
      request
        .post('comments.json', { comment }, requestConfig)
        .then(() => {
          const { $$comments } = this.state;
          const $$comment = Immutable.fromJS(comment);

          this.setState({
            $$comments: $$comments.unshift($$comment),
            submitCommentError: null,
            isSaving: false,
          });
        })
        .catch(error => {
          this.setState({
            submitCommentError: error,
            isSaving: false,
          });
        })
    );
  }

  render() {
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };

    return (
      <div className="commentBox container">
        <h2>Comments</h2>
        <p>
          Text take Github Flavored Markdown. Comments older than 24 hours are deleted.<br />
          <b>Name</b> is preserved. <b>Text</b> is reset, between submits.
        </p>
        <CommentForm
          isSaving={this.state.isSaving}
          actions={{ submitComment: this.handleCommentSubmit }}
          error={this.state.submitCommentError}
          cssTransitionGroupClassNames={cssTransitionGroupClassNames}
        />
        <CommentList
          $$comments={this.state.$$comments}
          error={this.state.fetchCommentsError}
          cssTransitionGroupClassNames={cssTransitionGroupClassNames}
        />
      </div>
    );
  }
}
