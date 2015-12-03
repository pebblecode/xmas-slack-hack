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

var reqp = _interopRequireWildcard(_requestPromise);

var _secretJson = require('../../../secret.json');

var secret = _interopRequireWildcard(_secretJson);

var logger = (0, _debug2['default'])('word');

var announced_user = false;

function root(server) {

  function slackpost(request, reply) {
    var text = request.payload.text;
    var user_id = request.payload.user_id;
    console.log('new slackpost', text);

    var search_terms = [{
      regex: /xmas|crimbo|festive|merry|festive|jolly|christmas/i,
      name: 'christmas'
    }, {
      regex: /beer/i,
      name: 'beer'
    }];

    var found_words = search_terms.map(testWord);

    function testWord(search_term) {
      console.log('testing');
      if (search_term.regex.test(text)) {
        console.log('found', search_term.name);
        saveWord(search_term.name);
      }
    }

    function saveWord(name) {
      server.methods.Word.findOneAndUpdate({
        word: name
      }, {
        $inc: { count: 1 }
      }, {
        upsert: true
      }).then(function (result) {
        console.log(result);
      }, function (err) {
        console.log(err);
      });
      announced_user = getUserDetails(user_id);
    }

    reply();
  }

  function getUserDetails(user_id) {
    var params = {
      uri: 'https://slack.com/api/users.info?token=' + secret.token,
      method: 'GET'
    };
    reqp(params).then(function (reply) {
      announced_user = reply;
    });
  }

  function post(request, reply) {
    var word = request.payload.word;
    console.log('new request to post:', word);
    var new_word = new server.methods.Word({ word: word });
    console.log(new_word);
    new_word.save().then(function (result) {
      reply(result);
    }, function (err) {
      console.log(err);
      reply(err);
    });
  }

  function getAll(request, reply) {
    console.log('new request to getAll');

    server.methods.Word.find({}).then(function (words) {
      if (announced_user) {
        words.announced_user = announced_user;
        announced_user = false;
      }
      reply(words);
    }, function (err) {
      logger.error(err);
      reply(_boom2['default'].badImplementation());
    });
  }

  function get(request, reply) {
    var word = request.params.word;
    console.log('new request to get:', word);

    server.methods.Word.find({ word: word }).then(function (words) {
      reply(words);
    }, function (err) {
      logger.error(err);
      reply(_boom2['default'].badImplementation());
    });
  }

  return {
    slackpost: slackpost,
    post: post,
    get: get,
    getAll: getAll
  };
}

module.exports = exports['default'];
//# sourceMappingURL=word.js.map