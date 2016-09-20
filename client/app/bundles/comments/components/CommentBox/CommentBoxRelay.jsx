import BaseComponent from 'libs/components/BaseComponent';
import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import CommentForm from './CommentForm/CommentFormRelay';
import CommentList from './CommentList/CommentListRelay';
import css from './CommentBox.scss';

class CommentBox extends BaseComponent {
  static propTypes = {
    relay: PropTypes.object.isRequired,
    viewer: PropTypes.object.isRequired,
  };

  render() {
    const { viewer } = this.props;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };

    return (
      <div className="commentBox container">
        <h2>
          Comments
        </h2>
        <p>
          <b>Text</b> supports Github Flavored Markdown.
          Comments older than 24 hours are deleted.<br />
          <b>Name</b> is preserved. <b>Text</b> is reset, between submits.
        </p>
        <CommentForm
          relay={this.props.relay}
          cssTransitionGroupClassNames={cssTransitionGroupClassNames}
        />
        <CommentList
          viewer={viewer}
          cssTransitionGroupClassNames={cssTransitionGroupClassNames}
        />
      </div>
    );
  }
}

export default Relay.createContainer(CommentBox, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${CommentList.getFragment('viewer')}
      }
    `,
  },
});
