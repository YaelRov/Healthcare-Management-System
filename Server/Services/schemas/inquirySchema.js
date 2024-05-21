const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const inquirySchema = new Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Might be null initially
    question: { type: String, required: true },
    answer: { type: String },
    documents: [{ type: String }], // Array to store file URLs/paths
    timestamp: { type: Date, default: Date.now },
  });

  module.exports = inquirySchema;