import React from 'react';
import PropTypes from 'prop-types';

import BaseComponent from 'libs/components/BaseComponent';

import CommentBox from '../CommentBox/CommentBox';
import css from './CommentScreen.module.scss';

export default class CommentScreen extends BaseComponent {
  static propTypes = {
    actions: PropTypes.oneOfType([PropTypes.object]).isRequired,
    data: PropTypes.oneOfType([PropTypes.object]).isRequired,
    locationState: PropTypes.oneOfType([PropTypes.object]),
  };

  renderNotification() {
    const { locationState } = this.props;

    if (!locationState || !locationState.redirectFrom) return null;

    return (
      <div className={`bg-success ${css.notification}`}>
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
          <hr />
          <div className="container footer row">
            <div className="col-sm-6">
              <a href="http://www.shakacode.com">
                <div className={css.logo} />
                <div>Example of styling using image-url and Open Sans Light custom font</div>
              </a>
            </div>
            <div className="col-sm-6">
              <a href="https://twitter.com/railsonmaui">
                <div className={css.twitterImage} />
                Rails On Maui on Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
