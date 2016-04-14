import commentsReducer, { $$initialState as $$commentsState } from './commentsReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
  $$commentsStore: commentsReducer,
  railsContext: railsContextReducer,
};

export const initialStates = {
  $$commentsState,
  railsContextState,
};
