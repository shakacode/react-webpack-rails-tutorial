// Example of React + Redux
// Shows the mapping from the exported object to the name used by the server rendering.
import App from './ServerApp';
import RouterApp from './ServerRouterApp';

// We can use the node global object for exposing.
// NodeJs: https://nodejs.org/api/globals.html#globals_global
global.App = App;
global.RouterApp = RouterApp;

