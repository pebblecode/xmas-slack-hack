'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var Schema = _mongoose2['default'].Schema;

var word = new Schema({
  word: String
}, { strict: false });

var Word = _mongoose2['default'].model('Word', word);

exports['default'] = Word;
module.exports = exports['default'];
//# sourceMappingURL=word.js.map