'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = register;

function register(server, options, next) {

  var word = require('./nonom')(server);

  server.route({
    method: 'POST',
    path: '/nonom',
    handler: word.nonom
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