export default function register(server, options, next) {

  const word = require('./nonom')(server);

  server.route({
    method: 'POST',
    path: '/nonom',
    handler: word.nonom
  });

  next();
}


register.attributes = {
  pkg: {
    name: 'slack-hack-routes',
    version: '1.0.0'
  }
};
