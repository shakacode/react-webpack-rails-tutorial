// eslint-disable-next-line max-classes-per-file
import React from 'react';
import Immutable from 'immutable';
import ReactOnRails from 'react-on-rails';
import { IntlProvider, injectIntl } from 'react-intl';
import BaseComponent from 'libs/components/BaseComponent';
import SelectLanguage from 'libs/i18n/selectLanguage';
import { defaultMessages, defaultLocale } from 'libs/i18n/default';
import { translations } from 'libs/i18n/translations';

import CommentList from '../CommentBox/CommentList/CommentList';
import css from './HotwiredCommentScreen.module.scss';

class HotwiredCommentScreen extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      $$comments: Immutable.fromJS(props.comments),
    };
  }

  componentDidMount() {
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
      <div className="commentBox prose max-w-none prose-a:text-sky-700 prose-li:my-0">
        <turbo-frame id="comment-box">
        <h2>{formatMessage(defaultMessages.comments)}</h2>
        {SelectLanguage(handleSetLocale, locale)}

        <CommentList
          $$comments={this.state.$$comments}
          cssTransitionGroupClassNames={cssTransitionGroupClassNames}
        />

        <div id="comment-form">
          <a data-turbo-stream="true" href="/comments/new">New Comment</a>
        </div>
        </turbo-frame>
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
    const InjectedHotwiredCommentScreen = injectIntl(HotwiredCommentScreen);

    return (
      <IntlProvider locale={locale} key={locale} messages={messages}>
        <InjectedHotwiredCommentScreen
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...this.props}
          locale={locale}
          handleSetLocale={this.handleSetLocale}
        />
      </IntlProvider>
    );
  }
}
