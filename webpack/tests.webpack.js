var context = require.context('./assets/javascripts', true, /-test\.js$/);
context.keys().forEach(context);
