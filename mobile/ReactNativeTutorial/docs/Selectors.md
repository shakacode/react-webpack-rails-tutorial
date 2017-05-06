## Selectors

Selectors are intermediary between Redux and React Native data interfaces. While React Native 
data model maps
one to one to the elements on the screen, Redux model is optimized for storing and reusing
data. This is analagous to Model and ViewModel in MVC.

Basically selectors are a set of functions, each performing a basic transformation, based
on the results of other selector or on a Redux store. Example selector that gets
 the commentsStore from the Redux store: 
```
state => state.get('commentsStore');
```

We use `reselect` library that memoizes the previous input and doesn't recompute if
the input isn't changed. That is critical because on each action you receive a new Redux
 state and have to save time on recalculations of the parts that didn't change. Additionally
 this ensures, that you don't re-render the parts of the UI that didn't change. Here's the example
 of the reselect usage:
 ```
 export default createSelector(
   commentsStoreSelector,
   commentsStore => Map({
     comments: commentsStore.delete('meta').valueSeq().sortBy(x => x.get('id')).reverse(),
     meta: commentsStore.get('meta'),
   })
 );
 ```
 
 Here we pass the selector as the first parameter and computation of a new value based on the
 results of this selector as a second parameter. As long as the input selector
 doesn't change, this selector returns the same precomputed value.
 
 As specified in the [Redux](Redux.md) section we use `Immutable.js` for storing the Redux
 state. React Native on the other hand uses plain JS objects. That means that at some
 point we'll have to convert Immutable to plain JS. There are two choices:
 1. Convert to JS upstream (i.e. immediately as you receive immutable state), use JS
 objects in most selectors and library like `lodash` to make data conversions.
 2. Convert to JS downstream (i.e. immediately before React Native UI components) and
 use immutable objects in most selectors with `Immutable.js` api.
 
 We use **only** `Immutable.js` objects inside the selectors and convert them to JS only in
 [containers](Containers.md). The reason immutable objects are better is that `reselect`
 and other libs use shallow compare of objects, that means you have to be careful with
 respect to deep objects as their comparison in some circumstances can 
 give false positive and trigger selector recalculation as well as unnecessary re-render.
 Additionally since `Immutable.js` api is already used inside reducers, it would be easier
 to reuse it here, rather than introducing new libs like `lodash`.
