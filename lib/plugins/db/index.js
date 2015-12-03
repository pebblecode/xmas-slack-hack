'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = register;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function register(server, options, next) {

  var url = 'mongodb://localhost/slackhack';

  _mongoose2['default'].connect(url);

  server.method('Word', require('./word'));

  next();
}

register.attributes = {
  pkg: {
    name: 'slack-hack-models',
    version: '1.0.0'
  }
};
module.exports = exports['default'];
//# sourceMappingURL=index.js.map