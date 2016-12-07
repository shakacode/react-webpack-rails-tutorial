## Containers and pure components

We split React components in two types: pure components and containers. To fully understand
the difference between these two types we need to understand the notion of a side effect.

### Side effects

According to wikipedia

> In computer science, a function or expression is said to have a side effect 
> if it modifies some state or has an observable interaction with calling functions 
> or the outside world. 

In our app the examples of the side effects might be altering Redux state, fetching
comments and drawing actual views on the screen.

Now we have to refine this definition to make it actually work properly for the React
Native app.

First, will drawing actual views on the screen be a side effect of a typical
React Native component? It seems natural to answer yes, but a component
just defines a set of rules of how to construct a component in terms of simpler components.
The actual drawing occurs inside React Native framework. So this is not a side effect of
a typical React Native component.

Second, we don't consider user interactions triggering callbacks, defined
in component to be a side effect of a component. That is because we think of side effects
as something that happens when we do render of a component. User interactions are 
themselves come from the outer world and simply forwarded to thunks.
 
So in the scope of this app we have two side effects:
1. Updating props as a result of Redux state change
2. Fetching comments on ComponentDidMount event

### Pure components

Pure components have only `Props` as inputs and have no side effects. 
A super simple criterion for checking that component is pure is to make sure it is
implemented as a function, rather than class extending `React.Component`. 
The whole purpose of keeping components pure is to make the testing of rendering
super easy.

### Containers

Containers on the other hand are entities that have side effects. Their single
purpose is to accumulate side effects and delegate a set of props to pure
components. So they don't contain any rendering logic and tested purely for side
effects.

To make testing easier we singled out each side effect into a higher order component.
 A higher order component (or simply HOC) is a function that takes one components as an
 argument and returns another component. For example this HOC
 
 ```
export const withInitFunction(initFunction: Function, Component: ReactClass<any>) =>
   class ComponentWithInit extends React.Component {
     componentDidMount() {
       initFunction();
     }

     render() {
       return <Component {...this.props} />;
     }
   };
 ```

adds initial action when a component is mounted.

Then a container is just a set of such HOCs, e.g. 
```
import withAddProps from '../hocs/withAddProps';
import Add from '../components/Add/Add';

export default withInitFunction(withAddProps(Add));
```
