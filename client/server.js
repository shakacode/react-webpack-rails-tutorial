var bodyParser = require('body-parser');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.hot.config');
var sleep = require('sleep');

var comments = [{author: 'Pete Hunt', text: 'Hey there!'},
                {author: 'Justin Gordon', text: 'Aloha from @railsonmaui'}];

var server = new WebpackDevServer(webpack(config), {
  //contentBase: "/public",
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  stats: {colors: true}
});

server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({extended: true}));

server.app.get('/comments.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

server.app.post('/comments.json', function(req, res) {
  console.log("Processing comment: %j", req.body.comment);
  console.log("(shhhh...napping 1 seconds)");
  sleep.sleep(1);
  console.log("Just got done with nap!");
  comments.push(req.body.comment);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

server.listen(3000, 'localhost', function(err, result) {
  if (err) { console.log(err); }
  console.log('Listening at localhost:3000...');
});
