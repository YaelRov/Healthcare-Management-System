
const { Schema } = require('mongoose');

const medicalFileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  medicalHistory: {
    type: String,
    required: true
  },
  prescriptions: {
    type: [String],
    default: []
  },
  allergies: {
    type: [String],
    default: []
  },
  visits: [
    {
      visitDate: {
        type: Date,
        default: Date.now
      },
      details: String
    }
  ]
});

module.exports = medicalFileSchema;