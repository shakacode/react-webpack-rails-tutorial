import React from 'react';
import PropTypes from 'prop-types';

const href =
  'https://github.com/shakacode/react_on_rails/blob/master/README.md#multiple-react-' +
  'components-on-a-page-with-one-store';
function CommentsCount(props) {
  const { commentsCount } = props;
  return (
    <li className="pt-2 lg:pt-0 lg:pl-2">
      <a
        id="js-comment-count"
        href={href}
        className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-sky-300 hover:text-sky-700"
      >
        Comments: {commentsCount}
      </a>
    </li>
  );
}

CommentsCount.propTypes = {
  commentsCount: PropTypes.number.isRequired,
};

export default CommentsCount;
