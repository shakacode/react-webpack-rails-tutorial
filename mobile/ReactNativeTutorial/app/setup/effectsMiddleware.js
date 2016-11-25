import _ from 'lodash/fp';
import realEffectCreators from './effectCreators/real';
import mockEffectCreators from './effectCreators/mock';

export const effectsMiddlewareCreator = (effectCreators) =>
  ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      const effects = _.mapValues(
        effectCreator => effectCreator({ dispatch, getState }),
        effectCreators
      );
      return action(effects);
    }
    return next(action);
  };

export const effectsMiddleware = effectsMiddlewareCreator(realEffectCreators);
export const mockEffectsMiddleware = effectsMiddlewareCreator(mockEffectCreators);
