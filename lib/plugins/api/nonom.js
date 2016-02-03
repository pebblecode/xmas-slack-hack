'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = root;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _secretJson = require('../../../secret.json');

var secret = _interopRequireWildcard(_secretJson);

var _slackbots = require('slackbots');

var _slackbots2 = _interopRequireDefault(_slackbots);

var bot = new _slackbots2['default']({
  token: secret.token,
  name: 'NomBot'
});

function root(server) {

  bot.on('message', function (data) {
    var params = {
      icon_emoji: ':hamburger:'
    };

    nonom(data);
    bot.postMessageToChannel('hacktesting', 'test!', params);
  });

  function nonom(request, reply) {
    var text = request.payload.text;
    var user_id = request.payload.user_id;
    console.log('new nonom', text);

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

      bot.postMessageToChannel('hacktesting', 'test!', params);
    }

    reply();
  }

  return {
    nonom: nonom
  };
}

module.exports = exports['default'];
//# sourceMappingURL=nonom.js.map