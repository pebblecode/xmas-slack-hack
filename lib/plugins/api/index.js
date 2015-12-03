'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = register;

function register(server, options, next) {

  var word = require('./word')(server);

  server.route({
    method: 'POST',
    path: '/slackpost',
    handler: word.slackpost
  });

  server.route({
    method: 'GET',
    path: '/word',
    handler: word.getAll
  });

  server.route({
    method: 'GET',
    path: '/word/{word}',
    handler: word.get
  });

  next();
}

register.attributes = {
  pkg: {
    name: 'slack-hack-routes',
    version: '1.0.0'
  }
};
module.exports = exports['default'];
//# sourceMappingURL=index.js.map