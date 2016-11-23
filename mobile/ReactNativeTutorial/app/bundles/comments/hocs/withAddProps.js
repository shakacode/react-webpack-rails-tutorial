// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import commentFormSelector from '../../../selectors/commentFormSelector';
import { actions } from '../sagas';

const mapStateToProps = createSelector(
  commentFormSelector,
  (commentForm: any) => commentForm.toJS()
);

const mapDispatchToProps = (dispatch: Function) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default (Component: ReactClass<any>): ReactClass<{}> =>
  connect(mapStateToProps, mapDispatchToProps)(Component);
