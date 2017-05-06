import { Map } from 'immutable';
import { createSelector } from 'reselect';
import commentsStoreSelector from './commentsStoreSelector';

export default createSelector(
  commentsStoreSelector,
  commentsStore => Map({
    comments: commentsStore.delete('meta').valueSeq().sortBy(x => x.get('id')).reverse(),
    meta: commentsStore.get('meta'),
  })
);
