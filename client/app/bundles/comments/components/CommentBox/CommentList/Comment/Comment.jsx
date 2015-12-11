import React, { PropTypes } from 'react';
import marked from 'marked';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import css from './Comment.scss';

export default class Comment extends React.Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };

  shouldComponentUpdate() {
    return PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  render() {
    const { author, text } = this.props;
    const rawMarkup = marked(text, { gfm: true, sanitize: true });

    return (
      <div className={css.comment}>
        <h2 className={`${css.commentAuthor} js-comment-author`}>
          {author}
        </h2>
        <span
          dangerouslySetInnerHTML={{ __html: rawMarkup }}
          className="js-comment-text"
        />
      </div>
    );
  }
}
