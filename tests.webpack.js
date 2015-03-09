var context = require.context('./assets/javascripts', true, /-test\.(js|jsx)$/);
context.keys().forEach(context);
