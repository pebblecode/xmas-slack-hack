'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _glue = require('glue');

var _glue2 = _interopRequireDefault(_glue);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var logger = (0, _debug2['default'])('http');

var manifest = {
  connections: [{
    port: 5555,
    routes: { cors: true }
  }],
  plugins: [{
    './api': [{
      routes: {
        prefix: '/api'
      }
    }]
  }, { './db': null }]
};

var options = {
  relativeTo: __dirname + '/plugins'
};

_glue2['default'].compose(manifest, options, function (err, server) {
  console.log('starting..');
  if (err) {
    throw err;
  }
  server.start(function () {

    logger('Hapi days!');
  });
});
//# sourceMappingURL=index.js.map