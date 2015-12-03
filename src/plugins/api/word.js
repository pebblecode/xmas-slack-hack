import Boom from 'boom';
import debug from 'debug';
import reqp from 'request-promise';
import *  as secret from '../../../secret.json';

const logger = debug('word');

let announced_user = false;

export default function root(server) {

  function slackpost(request, reply) {
    const text = request.payload.text
    const user_id = request.payload.user_id
    console.log('new slackpost', text)

    const search_terms = [{
      regex: /xmas|crimbo|festive|merry|festive|jolly|christmas/i,
      name: 'christmas'
    },{
      regex: /beer/i,
      name: 'beer'
    }]

    const found_words = search_terms.map(testWord)

    function testWord(search_term) {
      console.log('testing')
      if (search_term.regex.test(text)){
        console.log('found', search_term.name)
        saveWord(search_term.name)
      }
    }

    function saveWord(name) {
      server.methods.Word.findOneAndUpdate(
        {
          word:name
        }, {
          $inc: { count:1 }
        }, { 
          upsert: true
        })
        .then(result => { console.log(result) }, 
              err => { console.log(err) })
      if (!announced_user) {
        console.log(announced_user)
        announced_user = getUserDetails(user_id)
      }
    }

    reply()
  }

  function getUserDetails(user_id) {
    const params = {
      uri: 'https://slack.com/api/users.info',
      method: 'POST',
      json: true,
      form: {
        token: secret.token,
        user: user_id
      }
    }
    reqp(params).then(reply => {
      announced_user = reply
    })
  }

  function post(request, reply) {
    const word = request.payload.word;
    console.log('new request to post:', word)
    const new_word = new server.methods.Word({word:word})
    console.log(new_word)
    new_word.save().then(result => {
      reply(result)
    }, err => {
      console.log(err)
      reply(err)
    })
  }

  function getAll(request, reply) {
    console.log('new request to getAll')

    server.methods.Word.find({})
      .then(words => {
        if (announced_user) {
          words.announced_user = announced_user
        }
        reply(words);
      }, err => {
        logger.error(err);
        reply(Boom.badImplementation());
      });
  }

  function get(request, reply) {
    const word = request.params.word;
    console.log('new request to get:', word)

    server.methods.Word.findOne({ word: word })
      .then(words => {
        if (announced_user) {
          words.announced_user = announced_user
        }
        reply(words);
      }, err => {
        logger.error(err);
        reply(Boom.badImplementation());
      });
  }


  return {
    slackpost,
    post,
    get,
    getAll
  };

}
