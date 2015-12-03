export default function register(server, options, next) {

  const word = require('./word')(server);

  server.route({
    method: 'POST',
    path: '/word/{word}',
    handler: word.post
  });

  server.route({
    method: 'GET',
    path: '/word',
    handler: word.getAll
  });

  server.route({
    method: 'GET',
    path: '/test/',
    handler: function(req, reply) {
      console.log(req);
      reply(400);
    }
  });

  next();
}


register.attributes = {
  pkg: {
    name: 'slack-hack-routes',
    version: '1.0.0'
  }
};
