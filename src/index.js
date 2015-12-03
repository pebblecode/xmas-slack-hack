import Glue from 'glue';
import debug from 'debug';

const logger = debug('http');

const manifest = {
  connections: [{
    port: 5555,
    routes: {cors: true}
  }],
  plugins: [
    {
      './api': [{
        routes: {
          prefix: '/api'
        }
      }]
    },
    {'./db': null}
  ]
};

const options = {
  relativeTo: __dirname + '/plugins'
};

Glue.compose(manifest, options, (err, server) => {
  console.log('starting..')
  if (err) {
    throw err;
  }
  server.start(() => {

    logger('Hapi days!');
  });
});
