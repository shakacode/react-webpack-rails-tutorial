export default function logger({ getState }) {
  return next => action => {
    if (/^SAGA/i.test(action.type)) {
      console.info(`Executing saga action %c${action.type}`, 'color: #0C0CD6');
      return next(action);
    }
    console.info('Executing redux action', action);
    const result = next(action);
    const state = getState();
    console.info('State after dispatch', state.toJS());
    return result;
  };
}
