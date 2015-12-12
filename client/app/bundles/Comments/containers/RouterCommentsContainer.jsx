import React, { PropTypes } from 'react';
import CommentScreen from '../components/CommentScreen/CommentScreen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commentsActionCreators from '../actions/commentsActionCreators';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return { data: state.$$commentsStore };
}

class RouterCommentsContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired,
  };

  _renderNotification() {
    const locationState = this.props.location.state;
    if (!locationState || !locationState.redirectFrom) return null;

    return (
      <div className="notification bg-success">
        You've been redirected from <strong>{locationState.redirectFrom}</strong>
      </div>
    );
  }

  render() {
    const { dispatch, data } = this.props;
    const actions = bindActionCreators(commentsActionCreators, dispatch);

    return (
      <div>
        {this._renderNotification()}
        <CommentScreen {...{ actions, data }} />
      </div>
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(RouterCommentsContainer);
