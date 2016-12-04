/* eslint-disable import/prefer-default-export */
import _ from 'lodash/fp';

// The format for tempId (id for temporary object not stored on the remote server yet)
// is temp{n}, e.g. temp0, temp1, etc.
// This function gets the maximum tempId, e.g. temp10 and returns then next id, e.g. temp11
export const getNewId = (store) => {
  const tempPrefix = 'temp:';
  const tempRegex = new RegExp(`^${tempPrefix}`);
  const maxId = store
    .keySeq()
    .filter(key => tempRegex.test(key))
    .map(key => parseInt(key.substring(tempPrefix.length), 10))
    .max();
  const newId = _.isNil(maxId) ? 0 : maxId + 1;
  return `temp:${newId}`;
};
