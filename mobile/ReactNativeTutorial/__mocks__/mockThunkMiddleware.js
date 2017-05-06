import call from './mockCall';

export const thunkMiddlewareCreator = (callEffect) =>
  ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, callEffect({ dispatch }));
    }
    return next(action);
  };

export default thunkMiddlewareCreator(call);
