import { Alert } from 'react-native';
import { Actions as navigationActions } from 'react-native-router-flux';
import { reduxUtils } from 'ReactNativeTutorial/app/utils';
import commentsStoreSelector from 'ReactNativeTutorial/app/selectors/commentsStoreSelector';
import commentFormSelector from 'ReactNativeTutorial/app/selectors/commentFormSelector';

import { actions as reduxActions } from 'ReactNativeTutorial/app/reducers';
import * as api from 'ReactNativeTutorial/app/api';

export const fetch = () =>
  async function fetchCommentsEffect(dispatch, _, { call }) {
    dispatch(reduxActions.setLoadingComments(true));
    let response;
    try {
      response = await call(api.fetchComments);
    } catch (e) {
      call(console.log, e);
      call(Alert.alert, 'Error', 'Could not connect to server', [{ text: 'OK' }]);
      return;
    } finally {
      dispatch(reduxActions.setLoadingComments(false));
    }
    dispatch(reduxActions.createComments(response.entities.comments));
  };

export const updateForm = reduxActions.updateCommentForm;

export const createComment = () =>
  async function createCommentEffect(dispatch, getState, { call }) {
    const state = getState();
    const commentsStore = commentsStoreSelector(state);
    const tempId = reduxUtils.getNewId(commentsStore);

    const comment = commentFormSelector(state).merge({ id: tempId }).delete('meta');
    const reduxComment = { [tempId]: comment.toJS() };
    dispatch(reduxActions.createComments(reduxComment));
    call(navigationActions.pop);
    let response;
    try {
      response = await call(api.postComment, comment);
    } catch (e) {
      call(console.log, e);
      call(Alert.alert, 'Error', 'Could not post your comment', [{ text: 'OK' }]);
      return;
    } finally {
      dispatch(reduxActions.removeComment(tempId));
    }
    dispatch(reduxActions.createComments(response.entities.comments));
    dispatch(reduxActions.resetCommentForm());
  };
