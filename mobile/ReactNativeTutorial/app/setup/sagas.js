import _ from 'lodash/fp';

import commentsSagas from '../bundles/comments/sagas';

const sagas = [
  ...commentsSagas,
];

const sagaIterators = _.map(saga => saga && saga(), sagas);

function* appSaga() {
  yield sagaIterators;
}

export default appSaga;
