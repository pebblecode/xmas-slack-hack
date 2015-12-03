import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const word = new Schema({
  word: String
}, { strict: false });

const Word = mongoose.model('Word', word);

export default Word;
