import React from 'react';
import PropTypes from 'prop-types';

import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import css from './Comment.module.scss';

const Comment = React.forwardRef((props, ref) => {
  const { author, text } = props;
  const rawMarkup = marked(text, { gfm: true, sanitize: true });
  const sanitizedRawMarkup = sanitizeHtml(rawMarkup);

  /* eslint-disable react/no-danger */
  return (
    <div ref={ref} className={css.comment}>
      <h2 className={`${css.commentAuthor} js-comment-author`}>{author}</h2>
      <span dangerouslySetInnerHTML={{ __html: sanitizedRawMarkup }} className="js-comment-text" />
    </div>
  );
});

Comment.displayName = 'Comment';

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default React.memo(Comment);
