const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Install bcryptjs package if not already
const { MongoClient } = require('mongodb');
const medicalFileSchema = require('../Server/Services/schemas/medicalFileSchema');
// const { MONGODB_URL } = process.env.MONGODB_URL;
const MONGODB_URL="mongodb://localhost:27017/Cilnic";



// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/Cilnic', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => console.log('Connected to MongoDB'));

// // Define User Schema
// const userSchema = new mongoose.Schema({
//   idNumber: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// // Create User Model
// const User = mongoose.model('User', userSchema);

// // Function to generate random ID number
// function generateRandomIdNumber() {
//   // Implement logic to generate a random ID number within the desired range (e.g., 10 digits)
//   // You can use libraries like crypto or uuid to generate secure random IDs
//   return Math.floor(Math.random() * 1000000000) + 1000000000; // Example: 10-digit ID
// }

// // Function to generate random password
// function generateRandomPassword() {
//   // Implement logic to generate a secure random password with desired length and complexity
//   // You can use libraries like crypto or uuid to generate secure random passwords
//   return Math.random().toString(36).substr(2, 12); // Example: 12-character password
// }

// // Initialize database with 5 random users
// async function initializeUsers() {
//   for (let i = 0; i < 5; i++) {
//     const idNumber = generateRandomIdNumber();
//     const password = generateRandomPassword();

//     // Hash the password before storing in the database
//     const hashedPassword = await bcrypt.hash(password, 10); // Adjust salt rounds as needed

//     const user = new User({ idNumber, password: hashedPassword });
//     await user.save();

//     console.log(`User created: ID Number: ${idNumber}, Password: ${password}`);
//   }
// }

// // Initialize users after connecting to the database
// db.once('open', initializeUsers);




// async function initializeDatabase() {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('Connected to MongoDB');

//     // Define models with schemas
//     const MedicalFile = mongoose.model('MedicalFile', medicalFileSchema);

//     console.log('Collections created successfully');
//   } catch (error) {
//     console.error('Error initializing database:', error);
//   } finally {
//     // Close the connection
//     mongoose.connection.close();
//     console.log('MongoDB connection closed');
//   }
// }

// initializeDatabase();





// Connect to MongoDB
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define User Schema
const userSchema = new mongoose.Schema({
  idNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Define MedicalFile Model
const MedicalFile = mongoose.model('MedicalFile', medicalFileSchema);

// Function to generate random ID number
function generateRandomIdNumber() {
  return Math.floor(Math.random() * 1000000000) + 1000000000; // Example: 10-digit ID
}

// Function to generate random password
function generateRandomPassword() {
  return Math.random().toString(36).substr(2, 12); // Example: 12-character password
}

// Initialize database with 5 random users
async function initializeUsers() {
  for (let i = 0; i < 5; i++) {
    const idNumber = generateRandomIdNumber();
    const password = generateRandomPassword();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ idNumber, password: hashedPassword });
    await user.save();

    console.log(`User created: ID Number: ${idNumber}, Password: ${password}`);
  }
}

// Initialize users after connecting to the database
db.once('open', async () => {
  await initializeUsers();
  await initializeMedicalFiles();
});

// Function to initialize medical files for users
async function initializeMedicalFiles() {
  try {
    // Loop through users and create medical files for each
    const users = await User.find();
    for (const user of users) {
      const medicalFile = new MedicalFile({
        userId: user._id, // Assuming user ID is stored in _id field
        medicalHistory: 'Initial medical history',
        prescriptions: [],
        allergies: [],
        visits: [] // Optional, if you want to track visits
      });
      await medicalFile.save();
      console.log(`Medical file created for user with ID: ${user._id}`);
    }
  } catch (error) {
    console.error('Error initializing medical files:', error);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

