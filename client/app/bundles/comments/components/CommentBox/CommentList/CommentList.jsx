import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Alert from 'react-bootstrap/lib/Alert';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import _ from 'lodash';

import Comment from './Comment/Comment';
import BaseComponent from 'libs/components/BaseComponent';

export default class CommentList extends BaseComponent {
  static propTypes = {
    $$comments: PropTypes.instanceOf(Immutable.List).isRequired,
    error: PropTypes.any,
    cssTransitionGroupClassNames: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
    _.bindAll(this, '_errorWarning');
  }

  _errorWarning() {
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
    const commentNodes = $$comments.map($$comment =>

      // `key` is a React-specific concept and is not mandatory for the
      // purpose of this tutorial. if you're curious, see more here:
      // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
      <Comment
        key={$$comment.get('id')}
        author={$$comment.get('author')}
        text={$$comment.get('text')}
      />
    );

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName={cssTransitionGroupClassNames}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this._errorWarning()}
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
