import Glue from 'glue';

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
    }
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

    console.log('Hapi days!');
  });
});
