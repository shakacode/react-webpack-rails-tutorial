import { Alert } from 'react-native';
import { Actions as navigationActions } from 'react-native-router-flux';
import { reduxUtils } from 'ReactNativeTutorial/app/utils';
import commentsStoreSelector from 'ReactNativeTutorial/app/selectors/commentsStoreSelector';
import commentFormSelector from 'ReactNativeTutorial/app/selectors/commentFormSelector';

import { actions as reduxActions } from 'ReactNativeTutorial/app/reducers';
import * as api from 'ReactNativeTutorial/app/api';

export const fetch = () =>
  async function fetchCommentsThunk(dispatch) {
    dispatch(reduxActions.setLoadingComments(true));
    try {
      const response = await api.fetchComments();
      dispatch(reduxActions.createComments(response.entities.comments));
    } catch (e) {
      console.log(e);
      await Alert.alert('Error', 'Could not connect to server', [{ text: 'OK' }]);
    } finally {
      dispatch(reduxActions.setLoadingComments(false));
    }
  };

export const updateForm = reduxActions.updateCommentForm;

export const createComment = () =>
  async function createCommentThunk(dispatch, getState) {
    const state = getState();
    const commentsStore = commentsStoreSelector(state);
    const tempId = reduxUtils.getNewId(commentsStore);

    const comment = commentFormSelector(state).merge({ id: tempId }).delete('meta');
    const reduxComment = { [tempId]: comment.toJS() };
    dispatch(reduxActions.createComments(reduxComment));
    navigationActions.pop();
    try {
      const response = await api.postComment(comment);
      dispatch(reduxActions.createComments(response.entities.comments));
      dispatch(reduxActions.resetCommentForm());
    } catch (e) {
      console.log(e);
      await Alert.alert('Error', 'Could not post your comment', [{ text: 'OK' }]);
    } finally {
      dispatch(reduxActions.removeComment(tempId));
    }
  };
