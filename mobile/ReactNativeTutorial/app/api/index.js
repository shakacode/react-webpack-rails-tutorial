import _ from 'lodash/fp';
import { call } from 'redux-saga/effects';
import { normalize, Schema, arrayOf } from 'normalizr';

const API_URL = __DEV__ ? 'http://localhost:3000/' : 'http://www.reactrails.com/';

function* apiRequest(url, method, payload) {
  let options = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Auth': 'tutorial_secret',
    }
  };
  if (payload) options = {...options, body: JSON.stringify(payload)};
  const response = yield call(fetch, `${API_URL}${url}`, options);
  return yield call(response.json.bind(response));
}

function* getRequest(url) {
  return yield* apiRequest(url, 'GET');
}

function* postRequest(url, payload) {
  return yield* apiRequest(url, 'POST', payload);
}

export function* fetchComments() {
  const response = yield* getRequest('comments.json');
  const camelizedResponse = _.mapKeys(_.camelCase, response);
  const commentSchema = new Schema('comments');
  return normalize(camelizedResponse, { comments: arrayOf(commentSchema) });
}

export function* postComment(payload) {
  const response = yield* postRequest('comments.json', { comment: payload });
  const camelizedResponse = _.mapKeys(_.camelCase, response);
  const commentSchema = new Schema('comments');
  return normalize(camelizedResponse, commentSchema);
}
