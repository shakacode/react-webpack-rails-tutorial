import _ from 'lodash/fp';

export default function logger({ getState }) {
  return next => action => {
    if (typeof action === 'function') {
      console.info(`Executing thunk %c${_.upperCase(action.name)}`, 'color: #0C0CD6');
      return next(action);
    }
    console.info('Executing redux action', action);
    const result = next(action);
    const state = getState();
    console.info('State after dispatch', state.toJS());
    return result;
  };
}
