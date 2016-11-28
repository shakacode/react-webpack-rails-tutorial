/* eslint-disable react/no-unused-prop-types */
// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import commentsPropsSelector from 'ReactNativeTutorial/app/selectors/commentsPropsSelector';
import * as actions from '../effects';

type CommentType = {
  author?: string,
  text?: string,
}

export type IndexPropsType = {
  comments: Array<CommentType>,
  meta: {
    loading: boolean,
  },
  actions: {
    fetch: () => void,
    updateForm: (payload: Object) => void,
    createComment: (payload: Object) => void,
  }
}

const mapStateToProps = createSelector(
  commentsPropsSelector,
  props => props.toJS()
);

const mapDispatchToProps = (dispatch: Function) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default (Component: ReactClass<IndexPropsType>) =>
  connect(mapStateToProps, mapDispatchToProps)(Component);
