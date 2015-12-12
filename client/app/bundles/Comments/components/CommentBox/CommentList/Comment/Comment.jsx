import React, { PropTypes } from 'react';
import marked from 'marked';

import css from './Comment.scss';

export default class Comment extends React.Component {

  static propTypes = {
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };

  render() {
    const { author, text } = this.props;
    const rawMarkup = marked(text, { gfm: true, sanitize: true });

    return (
      <div className={css.comment}>
        <h2 className={css.commentAuthor}>
          {author}
        </h2>
        <span
          dangerouslySetInnerHTML={{ __html: rawMarkup }}
          className="comment-text"
        />
      </div>
    );
  }
}
