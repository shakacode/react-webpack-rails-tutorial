/* eslint-disable no-shadow */
import _ from 'lodash/fp';

class CallMock {
  constructor() {
    this.queue = [];
  }

  setMocks(mocks) {
    this.queue = mocks;
  }

  getNextMock() {
    if (_.isEmpty(this.queue)) return undefined;
    return this.queue.shift();
  }

  reset() {
    this.queue = [];
  }
}

const callMock = new CallMock();
export const mockCalls = (...args) => callMock.setMocks(args);
export const resetMockCalls = () => callMock.reset();

const dispatch = ({ dispatch }) => dispatch;
const getState = ({ getState }) => getState;
const call = ({ dispatch }) => (f, ...args) => {
  dispatch({ type: 'CALL', name: f.name, args });
  const mock = callMock.getNextMock();
  const result = typeof mock === 'function' ? mock() : mock;
  return f.then ? Promise.resolve(result) : result;
};

export default { dispatch, getState, call }
