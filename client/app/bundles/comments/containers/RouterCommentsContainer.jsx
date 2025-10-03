import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { IntlProvider } from 'react-intl';
import Intl from 'intl';
import { defaultLocale } from '../../../libs/i18n/default';
import translations from '../../../libs/i18n/translations';

import CommentScreen from '../components/CommentScreen/CommentScreen.jsx';
import * as commentsActionCreators from '../actions/commentsActionCreators';

global.Intl = Intl;

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return { data: state.$$commentsStore };
}

function RouterCommentsContainer(props) {
  const { dispatch, data } = props;
  const actions = bindActionCreators(commentsActionCreators, dispatch);
  const location = useLocation();
  const locationState = location.state;
  const locale = data.get('locale') || defaultLocale;
  const messages = translations[locale];

  return (
    <IntlProvider locale={locale} key={locale} messages={messages}>
      <CommentScreen {...{ actions, data, locationState }} />
    </IntlProvider>
  );
}

RouterCommentsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

// Don't forget to actually use connect!
export default React.memo(connect(select)(RouterCommentsContainer));
