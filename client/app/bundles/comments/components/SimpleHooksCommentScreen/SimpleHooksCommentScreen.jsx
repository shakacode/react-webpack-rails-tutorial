import { React, useState, useEffect } from "react";
import request from "axios";
import Immutable from "immutable";
import _ from "lodash";
import ReactOnRails from "react-on-rails";
import { IntlProvider, injectIntl } from "react-intl";
import BaseComponent from 'libs/components/BaseComponent';
import SelectLanguage from "libs/i18n/selectLanguage";
import { defaultMessages, defaultLocale } from "libs/i18n/default";
import { translations } from "libs/i18n/translations";

import CommentForm from "../CommentBox/CommentForm/CommentForm";
import CommentList from "../CommentBox/CommentList/CommentList";
import css from "../SimpleCommentScreen/SimpleCommentScreen.scss";

function SimpleHooksCommentScreen() {
  const [comments, setComments] = useState(Immutable.fromJS([]));
  const [isSaving, setIsSaving] = useState(false);
  const [fetchCommentsError, setFetchCommentsError] = useState(null);
  const [submitCommentError, setSubmitCommentError] = usestate(null);

  useEffect(() => {
    this.fetchComments();
  });

  function fetchComments() {
    return request
      .get("comments.json", { responseType: "json" })
      .then(res =>
        setComments(Immutable.fromJS(res.data.comments))
      )
      .catch(error => setFetchCommentsError(error));
  }

  function handleCommentSubmit(comment) {
    setIsSaving(true);

    const requestConfig = {
      responseType: "json",
      headers: ReactOnRails.authenticityHeaders()
    };

    return request
      .post("comments.json", { comment }, requestConfig)
      .then(() => {
        const $$comment = Immutable.fromJS(comment);
        setComments(comments.unshift($$comment));
        setSubmitCommentError(null);
        setIsSaving(false);
      })
      .catch(error => {
        setSubmitCommentError(error)
        setIsSaving(false);
      });
  }


  const { handleSetLocale, locale, intl } = this.props;
  const { formatMessage } = intl;
  const cssTransitionGroupClassNames = {
    enter: css.elementEnter,
    enterActive: css.elementEnterActive,
    leave: css.elementLeave,
    leaveActive: css.elementLeaveActive
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
        isSaving={isSaving}
        actions={{ submitComment: handleCommentSubmit }}
        error={submitCommentError}
        cssTransitionGroupClassNames={cssTransitionGroupClassNames}
      />
      <CommentList
        $$comments={comments}
        error={fetchCommentsError}
        cssTransitionGroupClassNames={cssTransitionGroupClassNames}
      />
    </div>
  );
}

export default class I18nWrapper extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      locale: defaultLocale
    };

    _.bindAll(this, "handleSetLocale");
  }

  handleSetLocale(locale) {
    this.setState({ locale });
  }

  render() {
    const { locale } = this.state;
    const messages = translations[locale];
    const InjectedSimpleHooksCommentScreen = injectIntl(SimpleHooksCommentScreen);

    return (
      <IntlProvider locale={locale} key={locale} messages={messages}>
        <InjectedSimpleHooksCommentScreen
          {...this.props}
          locale={locale}
          handleSetLocale={this.handleSetLocale}
        />
      </IntlProvider>
    );
  }
}
