import React from 'react';
import PropTypes from 'prop-types';

const href =
  'https://github.com/shakacode/react_on_rails/blob/master/README.md#multiple-react-' +
  'components-on-a-page-with-one-store';
function CommentsCount(props) {
  const { commentsCount } = props;
  return (
    <li>
      <a id="js-comment-count" href={href}>
        Comments: {commentsCount}
      </a>
    </li>
  );
}

CommentsCount.propTypes = {
  commentsCount: PropTypes.number.isRequired,
};

export default CommentsCount;
