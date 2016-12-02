class MockCall {
  constructor() {
    this.queue = [];
  }

  setMocks(mocks) {
    this.queue = mocks;
  }

  getNextMock() {
    if (!this.queue || !this.queue.length) return undefined;
    return this.queue.shift();
  }

  reset() {
    this.queue = [];
  }
}

const mockCall = new MockCall();

// Mocks calls inside a function under test. This function takes several args and
// stubs the return from call in order of occurence. If no mock were specified
// it returns underfined
export const mockCalls = (...args) => mockCall.setMocks(args);

// Clears all mocks for calls
export const resetMockCalls = () => mockCall.reset();

// The mock call dispatches a fake action to the store with type: 'CALL' and
// function name and args as parameters.
const call = ({ dispatch }) => (f, ...args) => {
  dispatch({ type: 'CALL', name: f.name, args });
  const mock = mockCall.getNextMock();
  const result = typeof mock === 'function' ? mock() : mock;
  return f.then ? Promise.resolve(result) : result;
};

export default call;
