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
  visualization: {
    entities: [{
      config: Schema.Types.Mixed,
      animation: Schema.Types.Mixed
    }]
  },
  pseudocode: String,
  solutions: [ String ]
}, { timestamps: true });

const Algorithm = mongoose.model('Algorithm', algorithmSchema);

module.exports = Algorithm;