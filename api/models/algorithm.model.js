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
      _id: false,
      entityType: String,
      config: { type: Schema.Types.Mixed, _id: false },
      animation: { type: Schema.Types.Mixed, _id: false }
    }]
  },
  pseudocode: String,
  solutions: [ String ]
}, { timestamps: true });

const Algorithm = mongoose.model('Algorithm', algorithmSchema);

module.exports = { Algorithm, algorithmSchema };