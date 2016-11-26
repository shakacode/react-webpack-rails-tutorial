import BaseComponent from 'libs/components/BaseComponent';
import React, { PropTypes } from 'react';
import I18n from 'i18n-js';
import CommentForm from './CommentForm/CommentForm';
import CommentList, { CommentPropTypes } from './CommentList/CommentList';
import css from './CommentBox.scss';
import { SelectLanguage, SetI18nLocale } from '../../common/i18nHelper';

export default class CommentBox extends BaseComponent {
  static propTypes = {
    pollInterval: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      fetchComments: React.PropTypes.function,
    }),
    data: PropTypes.shape({
      isFetching: React.PropTypes.boolean,
      isSaving: React.PropTypes.boolean,
      submitCommentError: React.PropTypes.string,
      $$comments: React.PropTypes.arrayOf(CommentPropTypes),
    }).isRequired,
  };

  componentDidMount() {
    const { fetchComments } = this.props.actions;
    fetchComments();
    this.intervalId = setInterval(fetchComments, this.props.pollInterval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { actions, data } = this.props;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    const locale = data.get('locale');
    SetI18nLocale(locale);

    return (
      <div className="commentBox container">
        <h2>
          { I18n.t('comments') } {data.get('isFetching') && 'Loading...'}
        </h2>
        { SelectLanguage(actions.setLocale) }
        <ul>
          <li>{ I18n.t('description.support_markdown') }</li>
          <li>{ I18n.t('description.delete_rule') }</li>
          <li>{ I18n.t('description.submit_rule') }</li>
        </ul>
        <CommentForm
          isSaving={data.get('isSaving')}
          error={data.get('submitCommentError')}
          actions={actions}
          cssTransitionGroupClassNames={cssTransitionGroupClassNames}
        />
        <CommentList
          $$comments={data.get('$$comments')}
          error={data.get('fetchCommentError')}
          cssTransitionGroupClassNames={cssTransitionGroupClassNames}
        />
      </div>
    );
  }
}
