const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  theme: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = { Settings, settingsSchema };