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
export const mockCalls = (...args) => mockCall.setMocks(args);
export const resetMockCalls = () => mockCall.reset();

const call = ({ dispatch }) => (f, ...args) => {
  dispatch({ type: 'CALL', name: f.name, args });
  const mock = mockCall.getNextMock();
  const result = typeof mock === 'function' ? mock() : mock;
  return f.then ? Promise.resolve(result) : result;
};

export default call;
