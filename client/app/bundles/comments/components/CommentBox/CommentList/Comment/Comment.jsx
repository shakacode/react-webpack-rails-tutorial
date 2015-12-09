import React, { PropTypes } from 'react';
import marked from 'marked';
import pureRender from 'pure-render-decorator';

<<<<<<< HEAD:client/app/bundles/comments/components/CommentBox/CommentList/Comment/Comment.jsx
import css from './Comment.scss';

export default class Comment extends React.Component {

=======
@pureRender
class Comment extends React.Component {
  static displayName = 'Comment';
>>>>>>> Including pure render decorator:client/app/bundles/Comments/components/Comment.jsx
  static propTypes = {
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };

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
