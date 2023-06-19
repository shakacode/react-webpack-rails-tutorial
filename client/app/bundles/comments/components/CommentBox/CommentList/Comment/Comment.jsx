import React from 'react';
import PropTypes from 'prop-types';

import { marked } from 'marked';
import css from './Comment.module.scss';

const Comment = React.forwardRef((props, ref) => {
  const { author, text, nodeRef } = props;
  const rawMarkup = marked(text, { gfm: true, sanitize: true });

  /* eslint-disable react/no-danger */
  return (
    <div ref={ref} className={css.comment}>
      <h2 className={`${css.commentAuthor} js-comment-author`}>{author}</h2>
      <span dangerouslySetInnerHTML={{ __html: rawMarkup }} className="js-comment-text" />
    </div>
  );
});

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  nodeRef: PropTypes.any.isRequired,
};

export default React.memo(Comment);
