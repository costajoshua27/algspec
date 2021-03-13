const { algorithmSchema } = require('./algorithm.model');
// const { achievementSchema } = require('./achievement.model');
const { settingsSchema } = require('./settings.model');
const { levelSchema } = require('./level.model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 4
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 4
  },
  currentLevel: levelSchema,
  currentExperience: {
    type: Number,
    required: true
  },
  settings: settingsSchema,
  algorithmsCompleted: [algorithmSchema],
  algorithmsInProgress: [algorithmSchema],
  // Will eventually implement achievements!
  // achievementsCompleted: [achievementSchema],
  // achievementSInProgress: [achievementSchema]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = { User, userSchema };