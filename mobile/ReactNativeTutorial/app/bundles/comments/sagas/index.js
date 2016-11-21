import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { actions as reduxActions } from '../../../reducers'

const FETCH = 'COMMENTS:FETCH';
const UPDATE_FORM = 'COMMENTS:UPDATE_FORM';

function* fetchHandler() {
  // try {
  //   const responsePromise = yield call(api.fetchEntities);
  //   const { comments } = yield call(() => responsePromise.json());
  //   yield put({ type: actionTypes.FETCH_COMMENTS_SUCCESS, comments });
  // } catch (e) {
  //   yield put({ type: actionTypes.FETCH_COMMENTS_FAILURE, error: e.message });
  // }
}

function* fetchSaga () {
  yield* takeLatest(FETCH, fetchHandler);
}

function* updateFormHandler(action) {
  yield put(reduxActions.updateCommentForm(action.payload));
}

function* updateFormSaga () {
  yield* takeLatest(UPDATE_FORM, updateFormHandler);
}

export default [
  fetchSaga,
  updateFormSaga,
];

const fetch = () => ({ type: FETCH });
const updateForm = (payload) => ({ type: UPDATE_FORM, payload });

export const actions = {
  fetch,
  updateForm,
};
