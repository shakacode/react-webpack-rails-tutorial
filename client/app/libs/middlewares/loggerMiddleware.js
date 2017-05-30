/* eslint no-console: 0 */

export default function logger({ getState }) {
  return (next) => (action) => {
    // TODO: Replace this file with redux-logger and move this conditional to helper
    // TODO: where we're setting up the included middleware.
    if (process.env.NODE_ENV !== 'development') {
      return next(action);
    }

    console.log('will dispatch', action);

    // Call the next dispatch method in the middleware chain.
    const result = next(action);

    // We can't _read_ immutable objects in console out-of-the-box.
    const state = getState();
    const readableState = {};

    Object.keys(state).forEach((storeItem) => {
      readableState[storeItem] = (
        state[storeItem].toJS ? state[storeItem].toJS() : state[storeItem]
      );
    });

    console.log('state after dispatch', readableState);

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return result;
  };
}
