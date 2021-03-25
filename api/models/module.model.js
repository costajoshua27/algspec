const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  categories: [Schema.Types.ObjectId],
  description: {
    type: String,
    required: true
  },
  introduction: {
    type: String,
    required: true
  },
  solutions: {
    type: [{
      language: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      }
    }],
    required: true
  }
}, { timestamps: true });

const Module = mongoose.model('Module', moduleSchema);

module.exports = { Module, moduleSchema };