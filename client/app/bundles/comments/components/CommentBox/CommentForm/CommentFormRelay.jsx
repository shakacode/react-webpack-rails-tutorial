import React, { PropTypes } from 'react';

import CommentForm from './CommentForm';
import CommentCreateMutation from '../../../mutations/CommentCreateMutation';

export default class CommentFormRelay extends CommentForm {
  static propTypes = {
    relay: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    error: PropTypes.any,
    cssTransitionGroupClassNames: PropTypes.object.isRequired,
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isSaving: true, error: '' });
    this.props.relay.commitUpdate(
      new CommentCreateMutation({
        comment: this.state.comment,
        viewer: null,
      }), {
        onFailure: transaction => {
          const error = transaction.getError() || new Error('Mutation failed.');
          this.setState({ isSaving: false, error: error.message });
        },
        onSuccess: () => {
          this.setState({ isSaving: false, error: '' });
          this.props.relay.forceFetch();
          this.resetAndFocus();
        },
      }
    );
  }
}
