import { React, useEffect, useReducer } from 'react';
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
import css from '../SimpleCommentScreen/SimpleCommentScreen.scss';


const initialState = {
  comments: Immutable.fromJS([]),
  isSaving: false,
  fetchCommentsError: null,
  submitCommentError: null,
};
function commentsReducer(state, action) {
  switch (action.type) {
    case 'Add_Comment': return ({ ...state, comments: action.payload });
    case 'Set_Is_Saving': return ({ ...state, isSaving: action.payload });
    case 'Set_Fetch_Comment_Error': return ({ ...state, fetchCommentsError: action.payload });
    case 'Submit_Comment_Error': return ({ ...state, submitCommentError: action.payload });
    default: return state;
  }
}
function SimpleHooksCommentScreen() {
  const [commentsList, dispatch] = useReducer(commentsReducer, initialState);

  function fetchComments() {
    return request
      .get('comments.json', { responseType: 'json' })
      .then(res =>
        dispatch({ type: 'Add_Comment', payload: Immutable.fromJS(res.data.comments) }))
      .catch(error => dispatch({ type: 'Set_Fetch_Comment_Error', payload: error }));
  }

  useEffect(() => {
    fetchComments();
  });


  function handleCommentSubmit(comment) {
    dispatch({ type: 'Set_Is_Saving', payload: true });

    const requestConfig = {
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
    };

    return request
      .post('comments.json', { comment }, requestConfig)
      .then(() => {
        const $$comment = Immutable.fromJS(comment);
        dispatch({ type: 'Add_Comment', payload: comment.unshift($$comment) });
        dispatch({ type: 'Submit_Comment_Error', payload: null });
        dispatch({ type: 'Set_Is_Saving', payload: false });
      })
      .catch(error => {
        dispatch({ type: 'Submit_Comment_Error', payload: error });
        dispatch({ type: 'Set_Is_Saving', payload: false });
      });
  }


  const { handleSetLocale, locale, intl } = this.props;
  const { formatMessage } = intl;
  const cssTransitionGroupClassNames = {
    enter: css.elementEnter,
    enterActive: css.elementEnterActive,
    leave: css.elementLeave,
    leaveActive: css.elementLeaveActive,
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
        isSaving={commentsList.isSaving}
        actions={{ submitComment: handleCommentSubmit }}
        error={commentsList.submitCommentError}
        cssTransitionGroupClassNames={cssTransitionGroupClassNames}
      />
      <CommentList
        $$comments={commentsList.comments}
        error={commentsList.fetchCommentsError}
        cssTransitionGroupClassNames={cssTransitionGroupClassNames}
      />
    </div>
  );
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
