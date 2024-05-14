const mongoose = require('mongoose');

const mongoose = require('mongoose');

const MedicalFileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true // Add an index for faster lookups by userId
  },
  patientName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  medicalHistory: {
    type: String,
    required: false
  },
  allergies: [
    {
      type: String,
      required: false
    }
  ],
  medications: [
    {
      name: {
        type: String,
        required: true
      },
      dosage: {
        type: String,
        required: true
      },
      frequency: {
        type: String,
        required: true
      }
    }
  ],
  appointments: [
    {
      date: {
        type: Date,
        required: true
      },
      doctor: {
        type: String,
        required: true
      },
      notes: {
        type: String,
        required: false
      }
    }
  ],
  details: {
    type: Array,
    required: false
  }, // You can keep the "details" array if you need additional unstructured data
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


const MedicalFile = mongoose.model('MedicalFile', MedicalFileSchema);

async function getMedicalFile(userId) {
  try {
    const medicalFile = await MedicalFile.findOne({ userId });
    return medicalFile; // return the entire document or specific fields if needed
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getAllMedicalFiles(paginationOptions = {}) {
  // Implement pagination using Mongoose features like skip and limit
  // Example with default limit of 10
  const limit = paginationOptions.limit || 10;
  const skip = paginationOptions.skip || 0;

  try {
    const medicalFiles = await MedicalFile.find({}, null, { skip, limit });
    return medicalFiles;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function addDetail(userId, detail) {
  try {
    const medicalFile = await MedicalFile.findOneAndUpdate(
      { userId },
      { $push: { details: detail } },
      { new: true } // return the updated document
    );
    return medicalFile;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteDetail(userId, detail) {
  try {
    const medicalFile = await MedicalFile.findOneAndUpdate(
      { userId },
      { $pull: { details: detail } },
      { new: true } // return the updated document
    );
    return medicalFile;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function updateMedicalFile(userId, updateData) {
  try {
    const medicalFile = await MedicalFile.findOneAndUpdate(
      { userId },
      updateData,
      { new: true } // return the updated document
    );
    return medicalFile;
  } catch (err) {
    console.error(err);
    throw err;ב
  }
}

module.exports = {
  getMedicalFile,
  getAllMedicalFiles,
  addDetail,
  deleteDetail,
};
