
const { Schema } = require('mongoose');

const userSchema = new Schema({
    idNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  });

  module.exports = userSchema;