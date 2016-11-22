// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import commentsStoreSelector from '../../../selectors/commentsStoreSelector';
import { actions } from '../sagas';

const mapStateToProps = createSelector(commentsStoreSelector, commentsStore => commentsStore.toJS());

const mapDispatchToProps = (dispatch: Function) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default (Component: ReactClass<any>): ReactClass<{}> =>
  connect(mapStateToProps, mapDispatchToProps)(Component);
