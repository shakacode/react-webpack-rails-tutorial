import commentsReducer from './commentsReducer';
import { $$initialState as $$commentsState } from './commentsReducer';

export default {
  $$commentsStore: commentsReducer,
};

export const initalStates = {
  $$commentsState,
};
