import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import BaseComponent from 'libs/components/BaseComponent';
import { injectIntl } from 'react-intl';
import SelectLanguage from 'libs/i18n/selectLanguage';
import { defaultMessages, defaultLocale } from 'libs/i18n/default';
import CommentForm from '../CommentBox/CommentForm/CommentForm';
import CommentList, { commentPropTypes } from '../CommentBox/CommentList/CommentList';
import css from './StimulusCommentBox.module.scss';

class StimulusCommentBox extends BaseComponent {
  static propTypes = {
    pollInterval: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      fetchComments: PropTypes.func,
    }),
    data: PropTypes.shape({
      isFetching: PropTypes.func,
      isSaving: PropTypes.bool,
      submitCommentError: PropTypes.string,
      $$comments: PropTypes.arrayOf(commentPropTypes),
    }).isRequired,
    intl: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  constructor() {
    super();
    _.bindAll(this, [
      'refreshComments',
    ]);
  }

  componentDidMount() {
    const { fetchComments } = this.props.actions;
    fetchComments();
  }

  refreshComments() {
    const { fetchComments } = this.props.actions;
    fetchComments();
  }

  render() {
    const { actions, data, intl } = this.props;
    const { formatMessage } = intl;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };
    const locale = data.get('locale') || defaultLocale;
    /* eslint-disable no-script-url */
    return (
      <div className="CommentBox container" data-controller="comments">
        <h2>
          {formatMessage(defaultMessages.comments)}
          {data.get('isFetching') && formatMessage(defaultMessages.loading)}
        </h2>
        {SelectLanguage(actions.setLocale, locale)}
        <ul>
          <li>
            {(data.get('isFetching') && <br />) ||
              <button className={css.anchorButton} data-comments-target='refresh' onClick={this.refreshComments} >
                {formatMessage(defaultMessages.descriptionForceRefrech)}
              </button>
            }
          </li>
          <li>{formatMessage(defaultMessages.descriptionSupportMarkdown)}</li>
          <li>{formatMessage(defaultMessages.descriptionDeleteRule)}</li>
          <li>{formatMessage(defaultMessages.descriptionSubmitRule)}</li>
          <li>{formatMessage(defaultMessages.descriptionSeeActionCable)}</li>
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

export default injectIntl(StimulusCommentBox);
