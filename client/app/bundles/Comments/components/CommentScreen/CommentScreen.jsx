import React, { PropTypes } from 'react';
import CommentBox from '../CommentBox/CommentBox';

export default class CommentScreen extends React.Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    const { data, actions } = this.props;

    return (
      <div>
        <CommentBox
          pollInterval={10000}
          data={data}
          actions={actions}
          ajaxCounter={data.get('ajaxCounter')}
        />
        <div className="container">
          <a href="http://www.railsonmaui.com">
            <h3 className="open-sans-light">
              <div className="logo" />
              Example of styling using image-url and Open Sans Light custom font
            </h3>
          </a>
          <a href="https://twitter.com/railsonmaui">
            <div className="twitter-image" />
            Rails On Maui on Twitter
          </a>
        </div>
      </div>
    );
  }
}
