import { Map } from 'immutable';
import { createSelector } from 'reselect';
import commentsStoreSelector from './commentsStoreSelector';

export default createSelector(
  commentsStoreSelector,
  commentsStore => Map({
    comments: commentsStore.delete('meta').valueSeq().sort((a, b) => b.get('id') - a.get('id')),
    meta: commentsStore.get('meta'),
  })
);
