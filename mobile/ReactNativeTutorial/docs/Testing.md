## Testing

We use [Jest snapshot testing](https://facebook.github.io/jest/blog/2016/07/27/jest-14.html) 
approach that is officially suported by React Native. In our opinion this is superior approach
 since it makes testing flexible and saves you from double implemeting components when
 describing the desired outcome in tests.
 
 React Native recommends using snapshot testing for components testing. We go a bit further
 and also use snapshots for testing of:
 - Reducers - by applying an action to a state and snapshotting the resulting state  
 - Selectors - by snaphotting the result of a selector applied to different states
 - Containers - by testing side effects of individual higher order components
 - Thunks - by applying them to a mock redux store and recording the dispatched
 redux actions into a snapshot. We also use a custom middleware that mocks `call` functions
 (see [Thunks](Thunks.md)) producing side effects and replaces them with fake `CALL`
 redux actions that are also recorded in a snapshot.
 
