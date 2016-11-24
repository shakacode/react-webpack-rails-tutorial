import Alert from 'react-bootstrap/lib/Alert';
import BaseComponent from 'libs/components/BaseComponent';
import Immutable from 'immutable';
import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import _ from 'lodash';

import Comment from './Comment/Comment';

export const commentPropTypes = {
  $$comments: PropTypes.instanceOf(Immutable.List).isRequired,
  error: PropTypes.any,
  cssTransitionGroupClassNames: PropTypes.object.isRequired,
};

export default class CommentList extends BaseComponent {
  static propTypes = commentPropTypes;

  constructor(props, context) {
    super(props, context);
    this.state = {};
    _.bindAll(this, 'errorWarning');
  }

  errorWarning() {
    // If there is no error, there is nothing to add to the DOM
    if (!this.props.error) return null;
    return (
      <Alert bsStyle="danger" key="commentFetchError">
        <strong>Comments could not be retrieved. </strong>
        A server error prevented loading comments. Please try again.
      </Alert>
    );
  }

  render() {
    const { $$comments, cssTransitionGroupClassNames } = this.props;
    const commentNodes = $$comments.map(($$comment, index) =>

      // `key` is a React-specific concept and is not mandatory for the
      // purpose of this tutorial. if you're curious, see more here:
      // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
      <Comment
        key={$$comment.get('id') || index}
        author={$$comment.get('author')}
        text={$$comment.get('text')}
      />,
    );

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName={cssTransitionGroupClassNames}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.errorWarning()}
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          transitionName={cssTransitionGroupClassNames}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          className="commentList"
          component="div"
        >
          {commentNodes}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
