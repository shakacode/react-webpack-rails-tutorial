import React from 'react';
import PropTypes from 'prop-types';

import BaseComponent from 'libs/components/BaseComponent';

import CommentBox from '../CommentBox/CommentBox';

export default class CommentScreen extends BaseComponent {
  static propTypes = {
    actions: PropTypes.oneOfType([PropTypes.object]).isRequired,
    data: PropTypes.oneOfType([PropTypes.object]).isRequired,
    locationState: PropTypes.oneOfType([PropTypes.object]),
  };

  renderNotification() {
    const { locationState } = this.props;

    if (!locationState || !locationState.redirectFrom) return null;

    window.history.replaceState({}, document.title);

    return (
      <div className="bg-success bg-green-100 px-6 py-4">
        You have been redirected from
        <strong>{locationState.redirectFrom}</strong>
      </div>
    );
  }

  render() {
    const { data, actions } = this.props;

    return (
      <div>
        {this.renderNotification()}
        <div>
          <CommentBox
            pollInterval={60000}
            data={data}
            actions={actions}
            ajaxCounter={data.get('ajaxCounter')}
          />
        </div>
      </div>
    );
  }
}
