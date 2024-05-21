// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt'); // Install bcryptjs package if not already
// const { MongoClient } = require('mongodb');
// const medicalFileSchema = require('./Services/schemas/medicalFileSchema');
// const appointmentSchema = require('../Server/Services/schemas/appointmentSchema');
// const inquirySchema = require('../Server/Services/schemas/inquirySchema');
// const userSchema = require('../Server/Services/schemas/userSchema');
// require('dotenv').config();

// const MONGODB_URL = process.env.MONGODB_URL;
// console.log(MONGODB_URL); // mongodb://localhost:27017/Cilnic




// mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => console.log('Connected to MongoDB'));

// // Define User Schema


// // Create User Model
// const User = mongoose.model('User', userSchema,'passwords');

// // Define MedicalFile Model
// const MedicalFile = mongoose.model('MedicalFile', medicalFileSchema,'medicalfiles');

// // Function to generate random ID number
// function generateRandomIdNumber() {
//   return Math.floor(Math.random() * 1000000000) + 1000000000; // Example: 10-digit ID
// }

// // Function to generate random password
// function generateRandomPassword() {
//   return Math.random().toString(36).substr(2, 12); // Example: 12-character password
// }

// // Initialize database with 5 random users
// async function initializeUsers() {
//   for (let i = 0; i < 5; i++) {
//     const idNumber = generateRandomIdNumber();
//     const password = generateRandomPassword();

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({ idNumber, password: hashedPassword });
//     await user.save();

//     console.log(`User created: ID Number: ${idNumber}, Password: ${password}`);
//   }
// }

// // Initialize users after connecting to the database


// // Function to initialize medical files for users
// async function initializeMedicalFiles() {
//   try {
//     // Loop through users and create medical files for each
//     const users = await User.find();
//     for (const user of users) {
//       const medicalFile = new MedicalFile({
//         userId: user._id, // Assuming user ID is stored in _id field
//         medicalHistory: 'Initial medical history',
//         prescriptions: [],
//         allergies: [],
//         visits: [] // Optional, if you want to track visits
//       });
//       await medicalFile.save();
//       console.log(`Medical file created for user with ID: ${user._id}`);
//     }
//   } catch (error) {
//     console.error('Error initializing medical files:', error);
//   } finally {
//     mongoose.connection.close();
//     console.log('MongoDB connection closed');
//   }
// }






// const Appointment = mongoose.model('Appointment', appointmentSchema,'appointments');

// // Inquiry Schema


// const Inquiry = mongoose.model('Inquiry', inquirySchema,'inquirys');

// // ... (generateRandomIdNumber, generateRandomPassword remain the same)

// // Function to initialize appointments (Example Data)
// async function initializeAppointments() {
//   try {
//     const patients = await User.find(); 
//     const doctors = await User.find(); // Assuming doctors are also users

//     for (const patient of patients) {
//       const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
//       const randomDate = new Date();
//       randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * 30)); // Random date within the next 30 days

//       const appointment = new Appointment({
//         patientId: patient._id,
//         doctorId: randomDoctor._id,
//         dateTime: randomDate,
//         reason: "a standard examination", // Example reason
//       });

//       await appointment.save();
//       console.log(`Appointment created for patient ${patient._id} with doctor ${randomDoctor._id} on ${randomDate}`);
//     }
//   } catch (error) {
//     console.error('Error initializing appointments:', error);
//   }
// }

// // Function to initialize inquiries with a question and answer for each patient
// async function initializeInquiries() {
//   try {
//     const patients = await User.find();
//     const doctors = await User.find();

//     for (const patient of patients) {
//       const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
//       const inquiry = new Inquiry({
//         patientId: patient._id,
//         doctorId: randomDoctor._id,
//         question: "What are the test results?",
//         answer: "The results are normal",
//         documents: [],
//       });

//       await inquiry.save();
//       console.log(`Inquiry created for patient ${patient._id} with doctor ${randomDoctor._id}`);
//     }
//   } catch (error) {
//     console.error('Error initializing inquiries:', error);
//   }
// }



// db.once('open', async () => {
//   await initializeUsers();
//   await initializeMedicalFiles();
//   await initializeAppointments();
//   await initializeInquiries();
//   mongoose.connection.close();
// });


// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// require('dotenv').config();

// const medicalFileSchema = require('./Services/schemas/medicalFileSchema');
// const appointmentSchema = require('./Services/schemas/appointmentSchema');
// const inquirySchema = require('./Services/schemas/inquirySchema');
// const passworsSchema = require('./Services/schemas/passworsSchema');
// const userDetailsSchema = require('./Services/schemas/userDetailsSchema');


// const MONGODB_URL = process.env.MONGODB_URL;
// console.log(MONGODB_URL); 

// mongoose.connect(MONGODB_URL) // Removed deprecated options
//   .then(async (connection) => {
//     console.log('Connected to MongoDB');
//     const db = connection.db;

//     // Define Models after successful connection
//     const User = mongoose.model('User', passworsSchema, 'passwords');
//     const MedicalFile = mongoose.model('MedicalFile', medicalFileSchema, 'medicalfiles');
//     const Appointment = mongoose.model('Appointment', appointmentSchema, 'appointments');
//     const Inquiry = mongoose.model('Inquiry', inquirySchema, 'inquiries');
//     const UserDetailes = mongoose.model('UserDetailes', inquirySchema, 'usersDetailes');


//     // Function to generate random ID number
//     function generateRandomIdNumber() {
//       return Math.floor(Math.random() * 1000000000) + 1000000000; 
//     }

//     // Function to generate random password
//     function generateRandomPassword() {
//       return Math.random().toString(36).substr(2, 12); 
//     }

//     // Function to initialize users
//     async function initializeUsers() {
//       console.log(db);
//       await db.collection('passwords').drop(); 

//       for (let i = 0; i < 5; i++) {
//         const idNumber = generateRandomIdNumber().toString();
//         const existingUser = await User.findOne({ idNumber });
//         if (existingUser) {
//           console.log(`User with ID ${idNumber} already exists. Skipping...`);
//           continue;
//         }

//         const password = generateRandomPassword();
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ idNumber, password: hashedPassword });
//         await user.save();
//         console.log(`User created: ID Number: ${idNumber}, Password: ${password}`);
//       }
//     }

//     // Function to initialize medical files for users
//     async function initializeMedicalFiles() {
//       try {
//         await db.collection('medicalfiles').drop(); 

//         const users = await User.find();
//         for (const user of users) {
//           const medicalFile = new MedicalFile({
//             userId: user._id, 
//             medicalHistory: 'Initial medical history',
//             prescriptions: [],
//             allergies: [],
//             visits: [] 
//           });
//           await medicalFile.save();
//           console.log(`Medical file created for user with ID: ${user._id}`);
//         }
//       } catch (error) {
//         console.error('Error initializing medical files:', error);
//       }
//     }

//     // Function to initialize appointments with a date for each patient
//     async function initializeAppointments() {
//       try {
//         await db.collection('appointments').drop(); 
//         const patients = await User.find(); 
//         const doctors = await User.find(); 

//         for (const patient of patients) {
//           const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
//           const randomDate = new Date();
//           randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * 30)); 

//           const appointment = new Appointment({
//             patientId: patient._id,
//             doctorId: randomDoctor._id,
//             dateTime: randomDate,
//             reason: "a standard examination"
//           });

//           await appointment.save();
//           console.log(`Appointment created for patient ${patient._id} with doctor ${randomDoctor._id} on ${randomDate}`);
//         }
//       } catch (error) {
//         console.error('Error initializing appointments:', error);
//       }
//     }

//     // Function to initialize inquiries with a question and answer for each patient
//     async function initializeInquiries() {
//       try {
//         await db.collection('inquiries').drop(); 

//         const patients = await User.find();
//         const doctors = await User.find();

//         for (const patient of patients) {
//           const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
//           const inquiry = new Inquiry({
//             patientId: patient._id,
//             doctorId: randomDoctor._id,
//             question: "What are the test results?",
//                     answer: "The results are normal",
//             documents: [],
//           });

//           await inquiry.save();
//           console.log(`Inquiry created for patient ${patient._id} with doctor ${randomDoctor._id}`);
//         }
//       } catch (error) {
//         console.error('Error initializing inquiries:', error);
//       }
//     }


//     await initializeUsers(db);
//     await initializeMedicalFiles(db);
//     await initializeAppointments(db);
//     await initializeInquiries(db);
//      mongoose.connection.close(); // Close the connection after initialization
//     process.exit(0); // Exit the Node.js process

//   })
//   .catch(err => console.error('MongoDB connection error:', err));




















// //   async function initializeUsersDetails(db) {
// //     try {
// //       // await db.collection('userDetails').drop(); 
// //       const users = await User.find();
// //       const randomDate = new Date();
// //       randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * 30)); 
// //       const cities = ['Jerusalem', 'Tel Aviv', 'Rechovot', 'Chaifa', 'Petah Tikva'];
// //       const streets = ['Moshe Dayan', 'Hertzel', 'Golda Meir', 'Shlomzion', 'Ben Gurion'];
// //       const names = ['Aharon', 'Rivka', 'Shulamit', 'David', 'Yael'];
// //       const numbers = [0o0541234567, 0o0537654321, 0o0541357632, 0o0521673155, 0o0525467665];
// //       for (const user of users) {
// //         const i = user.index;
// //         console.log('this is the i' + i);
// //         const name = names[i]
// //         const UsersDetails = new UsersDetails({
// //           userId: user._id, 
// //           userName: name,
// //           dateOfBirth: randomDate,
// //           address: {
// //             city: cities[i],
// //             street:streets[i],
// //             number:Math.random() * 40 + 1
// //           },
// //         email: `${name}${i}@gmail.com`,
// //         phoneNumber:numbers[i]
// //         });
// //         await userDetails.save();
// //         console.log(`userDetails created for user with ID: ${user._id}`);
// //       }
// //     } catch (error) {
// //       console.error('Error userDetails:', error);
// //     }
// //   } 
      
  