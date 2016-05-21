import commentsReducer, { $$initialState as $$commentsState } from './commentsReducer';

export default {
  $$commentsStore: commentsReducer,
};

export const initialStates = {
  $$commentsState,
};
