import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import * as commentsActionCreators from '../actions/commentsActionCreators';
import BaseComponent from 'libs/components/BaseComponent';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  if (state.$$commentsStore) {
    return { commentsCount: state.$$commentsStore.get('$$comments').size };
  } else {
    return { };
  }
}

class NavigationBarContainer extends BaseComponent {
  static propTypes = {
    commentsCount: PropTypes.number.isRequired,
  };

  render() {

    return (
      <NavigationBar commentsCount={this.props.commentsCount} />
    );
  }
}

// Don't forget to actually use connect!
export default connect(stateToProps)(NavigationBarContainer);
