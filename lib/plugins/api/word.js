'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = root;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _secretJson = require('../../../secret.json');

var secret = _interopRequireWildcard(_secretJson);

var _nodeSlack = require('node-slack');

var _nodeSlack2 = _interopRequireDefault(_nodeSlack);

var logger = (0, _debug2['default'])('word');

var slack = new _nodeSlack2['default']();

function root(server) {

  var announced_user = undefined;

  function slackpost(request, reply) {
    var text = request.payload.text;
    var user_id = request.payload.user_id;
    console.log('new slackpost', text);

    var search_terms = [{
      regex: /\wnom\w/i,
      name: 'christmas'
    }];

    var found_words = search_terms.map(testWord);

    function testWord(search_term) {
      if (search_term.regex.test(text)) {
        console.log('found', search_term.name);
        noNoms();
      }
    }

    function noNoms() {
      var response = slack.respond(request.body, function (hook) {
        return {
          text: 'Noms are not allowed.',
          username: 'NomBot'
        };
      });

      reply(response);
    }

    reply();
  }

  return {
    slackpost: slackpost
  };
}

module.exports = exports['default'];
//# sourceMappingURL=word.js.map