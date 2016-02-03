import *  as secret from '../../../secret.json';
import SlackBot from 'slackbots';

const bot = new SlackBot({
  token: secret.token,
  name: 'NomBot'
})


export default function root(server) {

  bot.on('message', (data) => {
    const params = {
      icon_emoji: ':hamburger:'
    }

    nonom(data)
    bot.postMessageToChannel('hacktesting', 'test!', params);
  })

  function nonom(request, reply) {
    const text = request.payload.text
    const user_id = request.payload.user_id
    console.log('new nonom', text)

    const search_terms = [{
      regex: /\wnom\w/i,
      name: 'christmas'
    }]

    const found_words = search_terms.map(testWord)

    function testWord(search_term) {
      if (search_term.regex.test(text)){
        console.log('found', search_term.name)
        noNoms()
      }
    }

    function noNoms() {
      const response = slack.respond(request.body, (hook) => {
        return {
          text: 'Noms are not allowed.',
          username: 'NomBot'
        }
      });

      bot.postMessageToChannel('hacktesting', 'test!', params);
    }

    reply()
  }

  return {
    nonom,
  };

}
