import BaseComponent from 'libs/components/BaseComponent';
import React, { PropTypes } from 'react';

import CommentForm from './CommentForm/CommentForm';
import CommentList, { CommentPropTypes } from './CommentList/CommentList';
import css from './CommentBox.scss';
import Immutable from 'immutable';
import ActionCable from 'actioncable';

export default class CommentBox extends BaseComponent {
  static propTypes = {
    pollInterval: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      fetchComments: React.PropTypes.function,
    }),
    data: PropTypes.shape({
      isFetching: React.PropTypes.boolean,
      isSaving: React.PropTypes.boolean,
      submitCommentError: React.PropTypes.string,
      $$comments: React.PropTypes.arrayOf(CommentPropTypes),
    }).isRequired,
  };

  subscribeChannel() {
    const { submitCommentSuccess } = this.props.actions;
    const cable = ActionCable.createConsumer("ws://localhost:5000/cable");
    cable.subscriptions.create({channel: "CommentsChannel"}, {
      received: (comment) => {
        submitCommentSuccess(Immutable.fromJS(comment));
      }
    });
  }

  componentDidMount() {
    const { fetchComments } = this.props.actions;
    fetchComments();
    this.subscribeChannel();
    //this.intervalId = setInterval(fetchComments, this.props.pollInterval);
  }

  componentWillUnmount() {
    App.cable.subscriptions.remove({ channel: "CommentsChannel" });
    //clearInterval(this.intervalId);
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
