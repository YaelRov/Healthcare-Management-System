const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const appointmentSchema = new Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming doctors are also users
    dateTime: { type: Date, required: true },
    reason: { type: String },
  });

  module.exports = appointmentSchema;