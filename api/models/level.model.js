const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const levelSchema = new Schema({
  number: {
    type: Number,
    min: 1,
    max: 100,
    required: true
  },
  experienceNeeded: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Level = mongoose.model('Level', levelSchema);
module.exports = { Level, levelSchema };