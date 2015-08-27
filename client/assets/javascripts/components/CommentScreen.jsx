import React from 'react';
import CommentBox from './CommentBox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchComments, submitComment }  from '../actions/CommentActionCreators';

const CommentActionsCreators = { fetchComments, submitComment };

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return { data: state.commentsData };
}

const CommentScreen = React.createClass({
  displayName: 'CommentScreen',

  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired,
  },

  render() {
    const { dispatch, data } = this.props;
    const actions = bindActionCreators(CommentActionsCreators, dispatch);
    return (
      <div>
        <CommentBox pollInterval={5000}
                    data={data}
                    actions={actions}
                    ajaxCounter={data.get('ajaxCounter')}/>

        <div className='container'>
          <a href='http://www.railsonmaui.com'>
            <h3 className='open-sans-light'>
              <div className='logo'/>
              Example of styling using image-url and Open Sans Light custom font
            </h3>
          </a>
          <a href='https://twitter.com/railsonmaui'>
            <div className='twitter-image'/>
            Rails On Maui on Twitter
          </a>
        </div>
      </div>
    );
  },
});

// Don't forget to actually use connect!
export default connect(select)(CommentScreen);
