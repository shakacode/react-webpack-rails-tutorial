/* eslint-disable no-shadow */
const dispatch = ({ dispatch }) => dispatch;
const getState = ({ getState }) => getState;
const call = () => (f, ...args) => f(...args);

export default { dispatch, getState, call };
