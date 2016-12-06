## UI components

UI components are a pure React Native components (see [Containers](Containers.md) for details).
We try to store all app state inside the Redux store (i.e. not using `setState`) and reacting
only using thunks, not plain Redux actions.
This is an opinionated approach in regards to both `setState` and using only thunks 
(see [Thunks](Thunks.md) for details).
