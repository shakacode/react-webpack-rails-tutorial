import React, { PropTypes } from 'react';

import CommentForm from './CommentForm';
import CommentList from './CommentList';

class CommentBox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  static displayName = 'CommentBox';
  static propTypes = {
    pollInterval: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { fetchComments } = this.props.actions;
    fetchComments();
    setInterval(fetchComments, this.props.pollInterval);
  }

  render() {
    const { actions, data } = this.props;

    return (
      <div className="commentBox container">
        <h2>
          Comments { data.get('isFetching') && 'Loading...' }
        </h2>
        <p>
          Text take Github Flavored Markdown. Comments older than 24 hours are deleted.
          <b>Name</b> is preserved, <b>Text</b> is reset, between submits.
        </p>
        <CommentForm
          isSaving={data.get('isSaving')}
          error={data.get('submitCommentError')}
          actions={actions}
        />
        <CommentList
          $$comments={data.get('$$comments')}
          error={data.get('fetchCommentError')}
        />
      </div>
    );
  }
}

export default CommentBox;
