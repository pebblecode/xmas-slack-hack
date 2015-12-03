import Boom from 'boom';
import debug from 'debug';

const logger = debug('word');

export default function root(server) {

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
