export default function logger({ getState }) {
  return next => action => {
    console.info('will dispatch action', action);
    const result = next(action);
    const state = getState();
    console.info('state after dispatch', state.toJS());
    return result;
  };
}
