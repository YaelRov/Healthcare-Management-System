const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define sub-schemas for questions, appointments, and visits
const InquirySchema = new Schema({
    //add man//**** *
  _id: { type: Schema.Types.ObjectId, auto: true },
  patientId:{type: Number, required: true},
  date: { type: Date, required: true },
  inquiryText: { type: String, required: true },
  answerText: { type: String },
  files: [{ type: String }], // URLs or paths to files
  status: { type: String, required: true } // e.g., 'pending', 'answered', 'closed'
});

const AppointmentSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  patientId:{type: Number, required: true},
  date: { type: Date, required: true },
  reason: { type: String, required: true }
});

const VisitSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  patientId:{type: Number, required: true},
  date: { type: Date, required: true },
  description: { type: String, required: true },
  files: [{ type: String }] // URLs or paths to files
});

const AddressSchema = new Schema({
    city: { type: String, required: true },
    street: { type: String, required: true },
    number: { type:Number, required: true }
});

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var EmailSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
});

// Define the main user schema
const UserSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  idNumber: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  address: { type:  AddressSchema, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: EmailSchema, required: true, unique: true },
  passwordHash: { type: String }, // Store hashed passwords
  profile: { type: String, required: true }, // e.g., 'doctor' or 'patient'
  inquiries: [InquirySchema],
  appointments: [AppointmentSchema],
  visits: [VisitSchema]
});



// Create and export the model
const User = mongoose.model('User', UserSchema);
const Email= mongoose.model('Email', EmailSchema);
module.exports = {
    User,
    validateEmail,
    Email
  };