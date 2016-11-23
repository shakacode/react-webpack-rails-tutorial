import BaseComponent from 'libs/components/BaseComponent';
import React, { PropTypes } from 'react';

import marked from 'marked';
import css from './Comment.scss';

export default class Comment extends BaseComponent {
  static propTypes = {
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };

  render() {
    const { author, text } = this.props;
    const rawMarkup = marked(text, { gfm: true, sanitize: true });

    /* eslint-disable react/no-danger */
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
