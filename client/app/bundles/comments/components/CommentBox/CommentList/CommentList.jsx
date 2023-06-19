import Alert from 'react-bootstrap/lib/Alert';
import Immutable from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import _ from 'lodash';
import BaseComponent from '../../../../../libs/components/BaseComponent.jsx';

import Comment from './Comment/Comment.jsx';

export const commentPropTypes = {
  $$comments: PropTypes.instanceOf(Immutable.List).isRequired,
  // TODO: Update error propType
  error: PropTypes.string,
  cssTransitionGroupClassNames: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default class CommentList extends BaseComponent {
  static propTypes = commentPropTypes;

  constructor(props, context) {
    super(props, context);
    this.state = {};
    _.bindAll(this, 'errorWarning');
  }

  errorWarning() {
    const { error, cssTransitionGroupClassNames } = this.props;

    // If there is no error, there is nothing to add to the DOM
    if (!error) return null;

    const nodeRef = React.createRef(null);

    return (
      <CSSTransition
        key="commentFetchError"
        nodeRef={nodeRef}
        timeout={500}
        classNames={cssTransitionGroupClassNames}
      >
        <Alert ref={nodeRef} bsStyle="danger">
          <strong>Comments could not be retrieved. </strong>A server error prevented loading comments. Please
          try again.
        </Alert>
      </CSSTransition>
    );
  }

  render() {
    const { $$comments, cssTransitionGroupClassNames } = this.props;
    const commentNodes = $$comments.map(($$comment, index) => (
      // `key` is a React-specific concept and is not mandatory for the
      // purpose of this tutorial. if you're curious, see more here:
      // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
      <CSSTransition
        key={$$comment.get('id') || index}
        nodeRef={$$comment.get('nodeRef')}
        timeout={500}
        classNames={cssTransitionGroupClassNames}
      >
        <Comment
          key={$$comment.get('id') || index}
          author={$$comment.get('author')}
          text={$$comment.get('text')}
          ref={$$comment.get('nodeRef')}
        />
      </CSSTransition>
    ));

    // For animation with TransitionGroup
    //   https://reactcommunity.org/react-transition-group/transition-group
    // The 500 must correspond to the 0.5s in:
    //   client/app/bundles/comments/components/CommentBox/CommentBox.module.scss:6
    return (
      <div>
        {this.errorWarning()}

        <TransitionGroup className="commentList" component="div">
          {commentNodes}
        </TransitionGroup>
      </div>
    );
  }
}
