const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achievementSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = { Achievement, achievementSchema };