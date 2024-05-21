const mongoose = require('mongoose');


const { Schema } = require('mongoose');

const passworsSchema = new Schema({
    idNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  });

  module.exports = passworsSchema;