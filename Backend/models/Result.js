const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;
