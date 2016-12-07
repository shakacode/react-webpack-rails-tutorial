## Thunks

Thunk is an action which can handle async function calls and dispatch Redux actions against
the Redux store. We think of Thunks as a central point for working with web Api requests and
Redux store and all business logic of the app. Thus redux reducers have really plain and
simple Redux actions and all the complex state changes and fething the data for this
changes are located in thunks.
 
We have to note that while thunks being a central place for async requests is a standard
practice, thunks calling a sequence of simple Redux actions is not. The other
widely used approach is using thunks only for async stuff and use redux actions as UI
actions. To understand what's the difference between two approaches we have to mention 
briefly the difference between object graph and data storage.
 
### Object graph vs Data storage
 
Object graph is a hierarchial set of objects in memory, linked by associations. This is what we're
used to when writing UI programs. E.g. a user has many posts, each post has a list of
likes, each like has an owner (user), etc. The associations between objects can be
very deep and even cyclical. If you think for a moment this structure is really close to
the way user interfaces are organized.
  
Data storage on the hand, is optimized for storing the data, i.e. it has a flat set of tables
with entites, probably linked to other entities by their respective ids. This is actually
really close to sql databases.
  
Now in our app we use Redux store which is represented by flat stores. Using `normalizr`
to transform nested API responses is considered best practice for Redux. So
Redux is `Data storage`, while UI data (props) is an `Object graph`.
   
### Our approach
 
We consider selectors as a mappers from `Data storage` (Redux) to an `Object Graph` 
(Props). Thunks work the other way round - they map simple UI actions to a set of simple
Redux actions. This keeps reducers interface really simple and all the real custom logic
is contained in thunks and localized to the UI they are working for.
 
Here's an example of thunk from our app
 
 ```
 () =>
   async function fetchCommentsThunk(dispatch, _getState, call) {
     dispatch(reduxActions.setLoadingComments(true));
     let response;
     try {
       response = await call(api.fetchComments);
     } catch (e) {
       call(Alert.alert, 'Error', 'Could not connect to server', [{ text: 'OK' }]);
       return;
     } finally {
       dispatch(reduxActions.setLoadingComments(false));
     }
     dispatch(reduxActions.createComments(response.entities.comments));
   };
 ```
 
 You see the interface of the reducer is really simple here, just two actions: 
 `setLoadingComments` and `createComments`. Now in a different UI part you can reuse
 this redux actions the create a new thunk with its own logic. The reducers maintain constant
 complexity when your app grows. This is the precise reason we prefer this approach
 over the alternaive (see below)
 
### Alternative approach
 
 An altenative approach is to react to each UI action inside a reducer and use thunks only
 for async stuff. You have to understand that this approach, though, leads to the growing
 of reducers code as your app grows, because for a new piece of UI have to create
 new actions and handle them inside reducers. What's worse - the code for handling
 different actions is often doing the same things. This make reducers hard to reason about.
  
 This approach though has advantage in offering atomic state updates. If you noticed above
 we are dispatching `reduxActions.setLoadingComments(false)` and then 
 `reduxActions.createComments(response.entities.comments)`. These are basically two state
 mutations and while it's not a problem in this app, it could have some undesirable 
 effects in other circumstances
  
##### P.S. Call as a third argument to thunk
  
 While most times you'll see apps using just two arguments in thunks 
 (`dispatch` and `getState`), we also add a third argument `call`. It is used for calling
 side effects inside Thunks (see [Side effects](Containers.md)). `call` is taking function
 with a side effect as a first argument and executes it. 
 The rest of the `call` arguments are passed to the function being executed. E.g.
   ```
   const square = x => x * x;
   const result = call(square, 3);
   // result = 9
   ```
   
 This little tweak allows us to test thunks very efficiently.  
 
