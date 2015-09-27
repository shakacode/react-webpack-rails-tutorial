/* eslint-disable no-console, func-names, no-var */
var bodyParser = require('body-parser');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var jade = require('jade');
var sleep = require('sleep');
var config = require('./webpack.client.hot.config');

var comments = [
  { author: 'Pete Hunt',     text: 'Hey there!' },
  { author: 'Justin Gordon', text: 'Aloha from @railsonmaui' },
];

var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false,
  },
});

server.app.use(bodyParser.json(null));
server.app.use(bodyParser.urlencoded({extended: true}));

server.app.get('/comments.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

server.app.post('/comments.json', function(req, res) {
  console.log('Processing comment: %j', req.body.comment);
  console.log('(shhhh...napping 1 seconds)');
  sleep.sleep(1);
  console.log('Just got done with nap!');
  comments.push(req.body.comment);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(req.body.comment));
});

server.app.use('/', function(req, res) {
  var locals = {
    props: JSON.stringify(comments),
  };
  var layout = process.cwd() + '/index.jade';
  var html = jade.compileFile(layout, { pretty: true })(locals);
  res.send(html);
});

server.listen(3000, 'localhost', function(err) {
  if (err) console.log(err);
  console.log('Listening at localhost:3000...');
});
