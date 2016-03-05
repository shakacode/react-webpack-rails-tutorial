import React, { PropTypes } from 'react';

import CommentForm from './CommentForm/CommentForm';
import CommentList from './CommentList/CommentList';
import css from './CommentBox.scss';
import BaseComponent from 'libs/components/BaseComponent';

export default class CommentBox extends BaseComponent {
  static propTypes = {
    pollInterval: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { fetchComments } = this.props.actions;
    fetchComments();
    this.intervalId = setInterval(fetchComments, this.props.pollInterval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { actions, data } = this.props;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };

    return (
      <div className="commentBox container">
        <h2>
          Comments {data.get('isFetching') && 'Loading...'}
        </h2>
        <p>
          <b>Text</b> supports Github Flavored Markdown.
          Comments older than 24 hours are deleted.<br />
          <b>Name</b> is preserved. <b>Text</b> is reset, between submits.
        </p>
        <CommentForm
          isSaving={data.get('isSaving')}
          error={data.get('submitCommentError')}
          actions={actions}
          cssTransitionGroupClassNames={cssTransitionGroupClassNames}
        />
        <CommentList
          $$comments={data.get('$$comments')}
          error={data.get('fetchCommentError')}
          cssTransitionGroupClassNames={cssTransitionGroupClassNames}
        />
      </div>
    );
  }
}
