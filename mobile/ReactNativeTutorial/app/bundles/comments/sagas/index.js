import { Alert } from 'react-native';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { actions as reduxActions } from '../../../reducers'
import * as api from '../../../api';

const FETCH = 'SAGA:COMMENTS:FETCH';
const UPDATE_FORM = 'SAGA:COMMENTS:UPDATE_FORM';

function* fetchHandler() {
  try {
    const response = yield call(api.fetchComments);
    yield put(reduxActions.createComments(response.entities))
  } catch (e) {
    console.log(e);
    yield call(Alert.alert, 'Error', 'Could not connect to server', [{text: 'OK'}]);
  }
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
