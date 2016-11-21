// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import commentsStoreSelector from '../../../selectors/commentsStoreSelector';
import * as actions from '../sagas';

const mapDispatchToProps = (dispatch: Function) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default (Component: ReactClass<any>): ReactClass<{}> =>
  connect(commentsStoreSelector, mapDispatchToProps)(Component);
