// eslint-disable-next-line max-classes-per-file
import React from 'react';
import request from 'axios';
import Immutable from 'immutable';
import _ from 'lodash';
import ReactOnRails from 'react-on-rails';
import { IntlProvider, injectIntl } from 'react-intl';
import BaseComponent from 'libs/components/BaseComponent';
import SelectLanguage from 'libs/i18n/selectLanguage';
import { defaultMessages, defaultLocale } from 'libs/i18n/default';
import { translations } from 'libs/i18n/translations';

import CommentForm from '../CommentBox/CommentForm/CommentForm';
import CommentList from '../CommentBox/CommentList/CommentList';
import css from './SimpleCommentScreen.module.scss';

class SimpleCommentScreen extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      $$comments: Immutable.fromJS([]),
      isSaving: false,
      fetchCommentsError: null,
      submitCommentError: null,
    };

    _.bindAll(this, 'fetchComments', 'handleCommentSubmit');
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments() {
    return request
      .get('comments.json', { responseType: 'json' })
      .then((res) => {
        const comments = [...res.data.comments];
        for (const comment of comments) {
          comment.nodeRef = React.createRef(null);
        }
        // comments.forEach((comment) => {
        //   comment.nodeRef = React.createRef(null);
        // });
        this.setState({ $$comments: Immutable.fromJS(comments) });
      })
      .catch((error) => this.setState({ fetchCommentsError: error }));
  }

  handleCommentSubmit(comment) {
    this.setState({ isSaving: true });

    const requestConfig = {
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
    };

    return request
      .post('comments.json', { comment }, requestConfig)
      .then(() => {
        const { $$comments } = this.state;
        // comment.nodeRef = React.createRef(null);
        const commentWithNodeRef = { ...comment, nodeRef: React.createRef(null) };
        const $$comment = Immutable.fromJS(commentWithNodeRef);

        this.setState({
          $$comments: $$comments.unshift($$comment),
          submitCommentError: null,
          isSaving: false,
        });
      })
      .catch((error) => {
        this.setState({
          submitCommentError: error,
          isSaving: false,
        });
      });
  }

  render() {
    const { handleSetLocale, locale, intl } = this.props;
    const { formatMessage } = intl;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      exit: css.elementLeave,
      exitActive: css.elementLeaveActive,
    };

    return (
      <div className="commentBox container">
        <h2>{formatMessage(defaultMessages.comments)}</h2>
        {SelectLanguage(handleSetLocale, locale)}
        <ul>
          <li>{formatMessage(defaultMessages.descriptionSupportMarkdown)}</li>
          <li>{formatMessage(defaultMessages.descriptionDeleteRule)}</li>
          <li>{formatMessage(defaultMessages.descriptionSubmitRule)}</li>
        </ul>
        <CommentForm
          isSaving={this.state.isSaving}
          actions={{ submitComment: this.handleCommentSubmit }}
          error={{ error: this.state.submitCommentError, nodeRef: React.createRef(null) }}
          cssTransitionGroupClassNames={cssTransitionGroupClassNames}
        />
        <CommentList
          $$comments={this.state.$$comments}
          error={this.state.fetchCommentsError}
          cssTransitionGroupClassNames={cssTransitionGroupClassNames}
        />
      </div>
    );
  }
}

export default class I18nWrapper extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      locale: defaultLocale,
    };

    _.bindAll(this, 'handleSetLocale');
  }

  handleSetLocale(locale) {
    this.setState({ locale });
  }

  render() {
    const { locale } = this.state;
    const messages = translations[locale];
    const InjectedSimpleCommentScreen = injectIntl(SimpleCommentScreen);

    return (
      <IntlProvider locale={locale} key={locale} messages={messages}>
        <InjectedSimpleCommentScreen
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...this.props}
          locale={locale}
          handleSetLocale={this.handleSetLocale}
        />
      </IntlProvider>
    );
  }
}
