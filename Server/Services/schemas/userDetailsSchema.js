
// const { required } = require('joi');
// const { Int32 } = require('mongodb');
const mongoose = require('mongoose'); 
const { Schema } = require('mongoose');
require('mongoose-type-email');

const addressSchema = new Schema({
    city: { type: String, required: true },
    street: { type: String, required: true },
    number: { type:Number, required: true }
});

const userDetailsSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    userName: { type: String, required: true},
    dateOfBirth: { type: Date, required: true },
    address: { type: addressSchema, required: true },
    email: { type: mongoose.SchemaTypes.Email, required: true },
    phoneNumber: { type: Number, required: true }

});

module.exports = userDetailsSchema;