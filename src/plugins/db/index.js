import mongoose from 'mongoose';

export default function register(server, options, next) {

  const url = 'mongodb://localhost/slackhack';

  mongoose.connect(url);

  server.method('Word', require('./word'));

  next();

}

register.attributes = {
  pkg: {
    name: 'slack-hack-models',
    version: '1.0.0'
  }
};
