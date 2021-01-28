const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const levelSchema = new Schema({
  number: {
    type: Number,
    required: true
  },
  experienceNeeded: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Level = mongoose.model('Level', levelSchema);
module.exports = { Level, levelSchema };