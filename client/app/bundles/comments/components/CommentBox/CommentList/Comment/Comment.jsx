import React from 'react';
import PropTypes from 'prop-types';

import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { mangle } from 'marked-mangle';
import sanitizeHtml from 'sanitize-html';

marked.use(gfmHeadingId());
marked.use(mangle());

const Comment = React.forwardRef((props, ref) => {
  const { author, text } = props;
  const rawMarkup = marked(text, { gfm: true });
  const sanitizedRawMarkup = sanitizeHtml(rawMarkup);

  /* eslint-disable react/no-danger */
  return (
    <div ref={ref}>
      <h2 className="js-comment-author text-blue-800">{author}</h2>
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
