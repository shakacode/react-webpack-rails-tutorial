import BaseComponent from 'libs/components/BaseComponent';
import React, { PropTypes } from 'react';

import CommentForm from './CommentForm/CommentForm';
import CommentList, { CommentPropTypes } from './CommentList/CommentList';
import css from './CommentBox.scss';
import { ActionCable } from 'actioncable-js';

var App = {};

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

  createConsumer() {
    App.cable = ActionCable.createConsumer("ws://localhost:3000/cable");    
  }

  createSubscription() {
    App.commentsChannel = App.cable.subscriptions.create({channel: "CommentsChannel"}, {
      // ActionCable callbacks
      connected: function() {
        console.log("connected", this.identifier)
      },
      disconnected: function() {
        console.log("disconnected", this.identifier)
      },
      received: function(data) {
        console.log("received")
        console.log(data)
      }
    });
  }

  componentDidMount() {
    const { fetchComments } = this.props.actions;
    fetchComments();
    this.createConsumer();
    this.createSubscription();
    //this.intervalId = setInterval(fetchComments, this.props.pollInterval);
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
    const app = App;

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
          app={app}
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
