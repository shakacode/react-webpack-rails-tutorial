// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import commentFormSelector from 'ReactNativeTutorial/app/selectors/commentFormSelector';
import * as actions from '../effects';

export type AddPropsType = {
  author?: string,
  text?: string,
  actions: {
    fetch: () => void,
    updateForm: (payload: Object) => void,
    createComment: (payload: Object) => void,
  }
}

const mapStateToProps = createSelector(
  commentFormSelector,
  (commentForm: any) => commentForm.toJS()
);

const mapDispatchToProps = (dispatch: Function) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default (Component: ReactClass<AddPropsType>) => connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
