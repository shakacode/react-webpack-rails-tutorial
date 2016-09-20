import Relay from 'react-relay';

export default class CommentCreateMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`fragment on Viewer { comments { id } }`,
  };

  getMutation() {
    return Relay.QL`mutation { createComment }`;
  }

  getVariables() {
    return this.props.comment;
  }

  getFatQuery() {
    return Relay.QL`fragment on CreateCommentPayload { comment { id, author, text } }`;
  }

  getConfigs() {
    return [];
  }
}
