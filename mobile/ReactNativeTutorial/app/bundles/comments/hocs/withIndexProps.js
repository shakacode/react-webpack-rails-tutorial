// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import commentsStoreSelector from '../../../selectors/commentsStoreSelector';
import { actions } from '../sagas';

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
  commentsStoreSelector,
  (commentsStore: any) => ({
    comments: commentsStore.delete('meta').toJS(),
    meta: commentsStore.get('meta').toJS(),
  })
);

const mapDispatchToProps = (dispatch: Function) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default (Component: ReactClass<IndexPropsType>): ReactClass<{}> =>
  connect(mapStateToProps, mapDispatchToProps)(Component);
