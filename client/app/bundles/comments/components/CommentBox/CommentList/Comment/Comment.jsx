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
    <div
      ref={ref}
      className="rounded-[1.6rem] border border-slate-200 bg-slate-50/90 p-5 shadow-sm shadow-slate-200"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="js-comment-author m-0 text-2xl text-slate-900">{author}</h2>
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Markdown
        </span>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedRawMarkup }}
        className="js-comment-text prose prose-slate mt-4 max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-sky-700"
      />
    </div>
  );
});

Comment.displayName = 'Comment';

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default React.memo(Comment);
