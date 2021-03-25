const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {
  timestamps: true,
  discriminatorKey: 'kind'
};

const exerciseSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  categories: [Schema.Types.ObjectId]
}, options);

const mcExerciseSchema = new Schema({
  choices: {
    type: [{
      code: {
        type: String,
        maxLength: 1,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }],
    required: true,
  },
  correctChoice: {
    type: String,
    maxLength: 1,
    required: true
  }
}, options);

const frqExerciseSchema = new Schema({
  correctAnswer: {
    type: String,
    required: true
  }
}, options);

const Exercise = mongoose.model('Exercise', exerciseSchema);
const MCExercise = Exercise.discriminator('MC', mcExerciseSchema);
const FRQExercise = Exercise.discriminator('FRQ', frqExerciseSchema);

module.exports = { Exercise, MCExercise, FRQExercise };

