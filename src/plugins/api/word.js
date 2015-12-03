import Boom from 'boom';
import debug from 'debug';

const logger = debug('word');

export default function root(server) {

  function slackpost(request, reply) {
    const text = request.payload.text
    console.log('new slackpost', text)

    search_terms = [{
      regex: /xmas|crimbo|festive|merry|festive|jolly|christmas/i,
      name: 'christmas'
    }]

    const found_words = search_terms.map(testWord).map(saveWord)

    function testWord(search_term) {
      console.log('testing')
      if (search_term.regex.test(text)){
        console.log('found!')
        saveWord(search_term.name)
      }
    }

    function saveWord(name) {
      const new_word = new server.methods.Word({word:word})
      console.log('saving', new_word)
      new_word.save().then(result => {
        console.log(result)
      }, err => {
        console.log(err)
      })
    }

    reply()
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
        reply(words);
      }, err => {
        logger.error(err);
        reply(Boom.badImplementation());
      });
  }

  function get(request, reply) {
    const word = request.params.word;
    console.log('new request to get:', word)

    server.methods.Word.find({ word: word })
      .then(words => {
        reply(words);
      }, err => {
        logger.error(err);
        reply(Boom.badImplementation());
      });
  }


  return {
    post,
    get,
    getAll
  };

}
