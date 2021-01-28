const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferencesSchema = new Schema({
}, { timestamps: true });

const Preferences = mongoose.model('Preferences', preferencesSchema);

module.exports = { Preferences, preferencesSchema };