import _ from 'lodash/fp';

export const getNewId = (store) => {
  const tempPrefix = 'temp:';
  const tempRegex = new RegExp(`^${tempPrefix}`);
  const maxId = store
    .keySeq()
    .filter(key => tempRegex.test(key))
    .map(key => parseInt(key.substring(tempPrefix.length), 10))
    .max();
  const newId = _.isNil(maxId) ? 0 : maxId + 1;
  return `temp${newId}`;
};
