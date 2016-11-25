/* eslint-disable react/no-unused-prop-types */
// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import commentsStoreSelector from 'ReactNativeTutorial/app/selectors/commentsStoreSelector';
import * as actions from '../effects';


import Index from '../components/Index/Index';

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

class IndexContainer extends React.Component {

  props: IndexPropsType;

  componentDidMount() {
    this.props.actions.fetch();
  }

  render() {
    return <Index {...this.props} />;
  }
}

const mapStateToProps = createSelector(
  commentsStoreSelector,
  (commentsStore: any) => ({
    comments: commentsStore.delete('meta').toJS(),
    meta: commentsStore.get('meta').toJS(),
  })
);

const mapDispatchToProps = (dispatch: Function) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer);
