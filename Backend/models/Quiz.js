const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  creator: { 
    type: String, 
    required: true
  },
  title: { 
    type: String, 
    required: true
  },
  questions: {
    type:[{
      questionText: String,
      options: [String],
      correctAnswer: String,
    }],
  }
});


const Quiz = mongoose.model('Quiz', questionSchema);
module.exports = Quiz;
