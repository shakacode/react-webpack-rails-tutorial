import { takeEvery } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import requestsManager from 'libs/requestsManager';
import * as actionTypes from '../constants/commentsConstants';
import * as actionCreators from '../actions/commentsActionCreators';

function* fetchComments() {
  try {
    const responce = yield call(requestsManager.fetchEntities);
    yield put(actionCreators.fetchCommentsSuccess(responce.data));
  } catch (error) {
    yield put(actionCreators.fetchCommentsFailure(error));
  }
}

function* submitComment(action) {
  try {
    const responce = yield call(requestsManager.submitEntity, action);
    yield put(actionCreators.submitCommentSuccess(responce.data));
  } catch (error) {
    yield put(actionCreators.submitCommentFailure(error));
  }
}

export function* fetchCommentsSaga() {
  yield* takeEvery(actionTypes.SET_IS_FETCHING, fetchComments);
}

export function* submitCommentSaga() {
  yield* takeEvery(actionTypes.SET_IS_SAVING, submitComment);
}

export default function* root() {
  yield fork(fetchCommentsSaga);
  yield fork(submitCommentSaga);
}
