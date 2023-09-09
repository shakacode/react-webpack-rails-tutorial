import React from 'react';
import PropTypes from 'prop-types';

const href =
  'https://github.com/shakacode/react_on_rails/blob/master/README.md#multiple-react-' +
  'components-on-a-page-with-one-store';
function CommentsCount(props) {
  const { commentsCount } = props;
  return (
    <li className="border-t border-gray-300 lg:border-t-0 lg:border-l">
      <a id="js-comment-count" href={href} className="px-2 py-4 inline-block">
        Comments: {commentsCount}
      </a>
    </li>
  );
}

CommentsCount.propTypes = {
  commentsCount: PropTypes.number.isRequired,
};

export default CommentsCount;
