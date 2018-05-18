import { Alert } from 'react-native';
import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { Actions as navigationActions } from 'react-native-router-flux';
import { reduxUtils } from '../../../utils';
import commentsStoreSelector from '../../../selectors/commentsStoreSelector';
import commentFormSelector from '../../../selectors/commentFormSelector';

import { actions as reduxActions } from '../../../reducers';
import * as api from '../../../api';

const FETCH = 'SAGA:COMMENTS:FETCH';
const CREATE_COMMENT = 'SAGA:COMMENTS:CREATE';
const UPDATE_FORM = 'SAGA:COMMENTS:UPDATE_FORM';


function* fetchHandler() {
  yield put(reduxActions.setLoadingComments(true));
  try {
    const response = yield call(api.fetchComments);
    yield put(reduxActions.createComments(response.entities.comments));
  } catch (e) {
    console.log(e);
    yield call(Alert.alert, 'Error', 'Could not connect to server', [{ text: 'OK' }]);
  } finally {
    yield put(reduxActions.setLoadingComments(false));
  }
}

function* fetchSaga() {
  yield* takeLatest(FETCH, fetchHandler);
}


function* updateFormHandler(action) {
  yield put(reduxActions.updateCommentForm(action.payload));
}

function* updateFormSaga() {
  yield* takeLatest(UPDATE_FORM, updateFormHandler);
}


function* createCommentHandler() {
  const state = yield select();
  const commentsStore = commentsStoreSelector(state);
  const tempId = reduxUtils.getNewId(commentsStore);

  const comment = commentFormSelector(state).merge({ id: tempId }).delete('meta');
  const reduxComment = { [tempId]: comment.toJS() };
  yield put(reduxActions.createComments(reduxComment));
  yield call(navigationActions.pop);
  try {
    const response = yield call(api.postComment, comment);
    yield put(reduxActions.createComments(response.entities.comments));
    yield put(reduxActions.resetCommentForm());
  } catch (e) {
    console.log(e);
    yield call(Alert.alert, 'Error', 'Could not post your comment', [{ text: 'OK' }]);
  } finally {
    yield put(reduxActions.removeComment(tempId));
  }
}

function* createCommentSaga() {
  yield* takeLatest(CREATE_COMMENT, createCommentHandler);
}

export default [
  fetchSaga,
  updateFormSaga,
  createCommentSaga,
];

const fetch = () => ({ type: FETCH });
const updateForm = (payload) => ({ type: UPDATE_FORM, payload });
const createComment = (payload) => ({ type: CREATE_COMMENT, payload });

export const actions = {
  fetch,
  updateForm,
  createComment,
};
