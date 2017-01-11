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

  constructor() {
    super();
    _.bindAll(this, [
      'refreshComments',
    ]);
  }

  subscribeChannel() {
    const { messageReceived } = this.props.actions;
    const protocol = window.location.protocol === "https:" ? "wss://" : "ws://"
    const cable = ActionCable.createConsumer(protocol+window.location.hostname+":"+window.location.port+"/cable");
    cable.subscriptions.create({channel: "CommentsChannel"}, {
      connected: () => {
        console.log("connected")
      },
      disconnected: () => {
        console.log("disconnected")
      },
      received: (comment) => {
        messageReceived(Immutable.fromJS(comment));
      }
    });
  }

  componentDidMount() {
    const { fetchComments } = this.props.actions;
    fetchComments();
    this.subscribeChannel();
  }

  componentWillUnmount() {
    App.cable.subscriptions.remove({ channel: "CommentsChannel" });
  }

  refreshComments() {
    const { fetchComments } = this.props.actions;
    fetchComments();
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
        <ul>
          <li>
        {data.get('isFetching') && <br/> ||
          <a href="javascript:void(0)" onClick={this.refreshComments}>Force Refresh of All Comments</a>
        }
          </li>
          <li>
          <b>Text</b> supports Github Flavored Markdown.
          </li>
          <li>
          Comments older than 24 hours are deleted.
          </li>
          <li>
          <b>Name</b> is preserved. <b>Text</b> is reset, between submits.
          </li>
          <li>
            To see Action Cable instantly update two browsers, open two browsers and submit a comment!
          </li>
        </ul>
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
