import realEffectCreators from './effectCreators/real';
import mockEffectCreators from './effectCreators/mock';

export const effectsMiddlewareCreator = (effectCreators) =>
  ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      const effects = {};
      Object.keys(effectCreators).each(key => {
        const effectCreator = effectCreators[key];
        effects[key] = effectCreator({ dispatch, getState });
      });
      return action(effects);
    }
    return next(action);
  };

export const effectsMiddleware = effectsMiddlewareCreator(realEffectCreators);
export const mockEffectsMiddleware = effectsMiddlewareCreator(mockEffectCreators);
