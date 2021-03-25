const { settingsSchema } = require('./settings.model');
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
  currentLevel: {
    type: Schema.Types.ObjectId,
    required: true
  },
  currentExperience: {
    type: Number,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  settings: settingsSchema,
  modulesCompleted: [Schema.Types.ObjectId],
  modulesInProgress: [Schema.Types.ObjectId],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = { User, userSchema };