import request from 'axios';
import Immutable from 'immutable';
import _ from 'lodash';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import { IntlProvider, injectIntl, intlShape } from 'react-intl';
import BaseComponent from 'libs/components/BaseComponent';

import CommentForm from '../CommentBox/CommentForm/CommentForm';
import CommentList from '../CommentBox/CommentList/CommentList';
import css from './SimpleCommentScreen.scss';
import { SelectLanguage, InitI18nLocale, convertTranslations,
          defaultMessages } from '../../common/i18nHelper';

InitI18nLocale();

export default (props, railsContext) => {
  const { i18nLocale, translations } = railsContext;
  return (
    <I18nWrapper
      {...props}
      locale={i18nLocale}
      translations={translations}
    />
  );
};

class I18nWrapper extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      locale: props.locale,
    };

    _.bindAll(this, 'handleSetLocale');
  }

  handleSetLocale(locale) {
    this.setState({ locale: locale });
  }

  render() {
    const { locale } = this.state;
    const { translations } = this.props;
    const messages = convertTranslations(translations, locale);
    const InjectedSimpleCommentScreen = injectIntl(SimpleCommentScreen);

    return (
      <IntlProvider locale={locale} key={locale} messages={messages}>
        <InjectedSimpleCommentScreen
          {...this.props}
          selectLanguage={SelectLanguage.bind(this, this.handleSetLocale, locale)}
        />
      </IntlProvider>
    );
  }
}

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
    return (
      request
        .get('comments.json', { responseType: 'json' })
        .then(res => this.setState({ $$comments: Immutable.fromJS(res.data.comments) }))
        .catch(error => this.setState({ fetchCommentsError: error }))
    );
  }

  handleCommentSubmit(comment) {
    this.setState({ isSaving: true });

    const requestConfig = {
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
    };

    return (
      request
        .post('comments.json', { comment }, requestConfig)
        .then(() => {
          const { $$comments } = this.state;
          const $$comment = Immutable.fromJS(comment);

          this.setState({
            $$comments: $$comments.unshift($$comment),
            submitCommentError: null,
            isSaving: false,
          });
        })
        .catch(error => {
          this.setState({
            submitCommentError: error,
            isSaving: false,
          });
        })
    );
  }

  render() {
    const { selectLanguage, intl } = this.props;
    const { formatMessage } = intl;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };

    return (
      <div className='commentBox container'>
        <h2>
          {formatMessage(defaultMessages.comments)}
        </h2>
        { selectLanguage() }
        <ul>
          <li>{formatMessage(defaultMessages.descriptionSupportMarkdown)}</li>
          <li>{formatMessage(defaultMessages.descriptionDeleteRule)}</li>
          <li>{formatMessage(defaultMessages.descriptionSubmitRule)}</li>
        </ul>
        <CommentForm
          isSaving={this.state.isSaving}
          actions={{ submitComment: this.handleCommentSubmit }}
          error={this.state.submitCommentError}
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
