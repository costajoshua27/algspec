const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const algorithmSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  tags: [ String ],
  introduction: String,
  overview: String,
  // visualizationCode: {
  //   type: String,
  //   data: Buffer
  // },
  pseudocode: String,
  solutions: [ String ]
}, { timestamps: true });

const Algorithm = mongoose.model('Algorithm', algorithmSchema);

module.exports = Algorithm;