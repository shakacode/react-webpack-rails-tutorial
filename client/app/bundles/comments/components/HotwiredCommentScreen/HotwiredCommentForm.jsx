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

import { Turbo } from '@hotwired/turbo-rails';
import CommentForm from '../CommentBox/CommentForm/CommentForm';
import css from './HotwiredCommentScreen.module.scss';

class HotwiredCommentForm extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      isSaving: false,
      submitCommentError: null,
    };

    _.bindAll(this, 'handleCommentSubmit');
  }

  componentDidMount() {
  }

  handleCommentSubmit(comment) {
    this.setState({ isSaving: true });

    const requestConfig = {
      responseType: 'text/vnd.turbo-stream.html',
      headers: ReactOnRails.authenticityHeaders(),
    };

    return request
      .post('comments.turbo_stream', { comment }, requestConfig)
      .then(r => r.data)
      .then(html => {
        Turbo.renderStreamMessage(html)
      })
      .then(() => {
        const { $$comments } = this.state;
        const $$comment = Immutable.fromJS(comment);

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
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      exit: css.elementLeave,
      exitActive: css.elementLeaveActive,
    };

    return (
      <div className="commentBox prose max-w-none prose-a:text-sky-700 prose-li:my-0">
        {SelectLanguage(handleSetLocale, locale)}

        <CommentForm
          isSaving={this.state.isSaving}
          actions={{ submitComment: this.handleCommentSubmit }}
          error={{ error: this.state.submitCommentError, nodeRef: React.createRef(null) }}
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
    const InjectedHotwiredCommentForm = injectIntl(HotwiredCommentForm);

    return (
      <IntlProvider locale={locale} key={locale} messages={messages}>
        <InjectedHotwiredCommentForm
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...this.props}
          locale={locale}
          handleSetLocale={this.handleSetLocale}
        />
      </IntlProvider>
    );
  }
}
