## Redux

For a details of a Redux framework please refer to 
[Getting Started with Redux videos](https://egghead.io/courses/getting-started-with-redux)

The basic idea of Redux is having a set of functions which takes state and actions as
arguments and return a new state based on the action params, i.e. functions
in the form `(state, action) => nextState`. These functions are called `reducers`. E.g. comments 
reducer in our app looks like this:

```
import { fromJS } from 'immutable';

// Actions types
const CREATE = 'COMMENTS_STORE:CREATE';
const REMOVE = 'COMMENTS_STORE:REMOVE';
const SET_LOADING = 'COMMENTS_STORE:SET_LOADING';

// Initial state
export const initialState = fromJS({
  meta: {
    loading: false,
  },
});

// Reducers for each action
const create = (state, action) => state.merge(action.entities);
const remove = (state, action) => state.delete(action.id);
const setLoading = (state, action) => state.setIn(['meta', 'loading'], action.loading);

// Comments reducer - combines individual reducer for each action
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      return create(state, action);
    case REMOVE:
      return remove(state, action);
    case SET_LOADING:
      return setLoading(state, action);
    default:
      return state;
  }
};

// Action creators
const createComments = (entities) => ({ type: CREATE, entities });
const removeComment = (id) => ({ type: REMOVE, id });
const setLoadingComments = (loading) => ({ type: SET_LOADING, loading });

// Exporting action creators
export const actions = {
  createComments,
  removeComment,
  setLoadingComments,
};

```

We first start by defining actions types. Action type is an id of the action for the
redux framework - it must be unique across the app, therefore we use the naming covention - 
action type = `{reducerName}:{actionName}`

The state of the Redux must be immutable by design, i.e. on each state change you have
to create new state, rather than modifying existing state. There are two approaches to
 handle that:
 1. Use JS plain objects as redux state and es6 destructuring for
 constructing a new state, e.g. 
 `const setLoadingComments = (state, action) => {...state, action.loading}`
 2. Use a library for immutable objects like 
 [Immutable.js](https://facebook.github.io/immutable-js/). This approach not only saves
 you from accidentally mutating your state, but also has advantages in caching computed 
 values (see [Selectors](Selectors.md) for details).
 
 Next we define simple reducer for each action. These functions use `Immutable.js` api for
 merging and updating the state (effectively they create a new state with these changes)
 
 After that comments reducer combines individual reducers using `switch case` on action type.
 
 Further we define actions creators - functions that return actions. Action creators
 abstract the internal structure of the action and are useful in other parts of the app for
  dispatching the actions.
