import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
// polyfill for server-side rendering, required by react-intl
import Intl from 'intl';
import { IntlProvider } from 'react-intl';
import BaseComponent from '../../../libs/components/BaseComponent.jsx';
import translations from '../../../libs/i18n/translations';
import { defaultLocale } from '../../../libs/i18n/default';

import CommentScreen from '../components/CommentScreen/CommentScreen.jsx';
import * as commentsActionCreators from '../actions/commentsActionCreators';

global.Intl = Intl;

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return { data: state.$$commentsStore };
}

class NonRouterCommentsContainer extends BaseComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  };

  render() {
    const { dispatch, data } = this.props;
    const actions = bindActionCreators(commentsActionCreators, dispatch);
    const locale = data.get('locale') || defaultLocale;
    const messages = translations[locale];

    return (
      <IntlProvider locale={locale} key={locale} messages={messages}>
        <CommentScreen {...{ actions, data }} />
      </IntlProvider>
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(NonRouterCommentsContainer);
