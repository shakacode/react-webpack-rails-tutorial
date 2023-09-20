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
        <div
          ref={nodeRef}
          className="bg-pink-100 p-4 mb-4 border border-pink-200 rounded text-red-800 prose-strong:text-red-800 prose-ul:my-1"
        >
          <strong>Comments could not be retrieved.</strong> A server error prevented loading comments. Please
          try again.
        </div>
      </CSSTransition>
    );
  }

  render() {
    const { $$comments, cssTransitionGroupClassNames } = this.props;
    const commentNodes = $$comments.map(($$comment, index) => {
      const nodeRef = React.createRef(null);
      return (
        <CSSTransition
          key={$$comment.get('id') || index}
          nodeRef={nodeRef}
          timeout={500}
          classNames={cssTransitionGroupClassNames}
        >
          <Comment
            key={$$comment.get('id') || index}
            author={$$comment.get('author')}
            text={$$comment.get('text')}
            ref={nodeRef}
          />
        </CSSTransition>
      );
    });

    // For animation with TransitionGroup
    //   https://reactcommunity.org/react-transition-group/transition-group
    // The 500 must correspond to $animationDuration in:
    //   client/app/assets/styles/app-variables.scss
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
