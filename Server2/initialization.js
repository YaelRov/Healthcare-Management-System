const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Install bcryptjs package if not already
const { MongoClient } = require('mongodb');
//  const UserSchema =require('./schema');
 const { User, validateEmail,Email } = require('./schema'); 
 
require('dotenv').config();
const MONGODB_URL = process.env.MONGODB_URL;
console.log(MONGODB_URL); // mongodb://localhost:27017/Cilnic
// const UserModel = mongoose.model('User', UserSchema,'users');

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

function generateRandomPassword() {
    return Math.random().toString().slice(2, 8);
  }

 

  async function initialization() {
    try {
      // Clear existing users (optional, for testing)
      await User.deleteMany({});
  
      for (let i = 0; i < 5; i++) {
        const user = new User({
          idNumber: 100000000 + i,
          firstName: `Patient${i + 1}`,
          lastName: `Lastname${i + 1}`,
          dateOfBirth: new Date(1980 + i, i, 15), // Random birthdate
          address: {
            city: ['Tel Aviv', 'Jerusalem', 'Haifa', 'Beersheba', 'Rishon LeZion'][i],
            street: ['Dizengoff', 'Jaffa', 'Allenby', 'Herzl', 'Bialik'][i],
            number: Math.floor(Math.random() * 100) + 1,
          },
          phoneNumber: `05${Math.floor(Math.random() * 100000000)}`, // Random phone number
          email:  new Email({ email: `patient${i + 1}@example.com` }),
          passwordHash: null, // Replace with actual password hashing
          profile: 'patient',
          inquiries: [
            { patientId: 100000000 + i, date: new Date(), inquiryText: 'Question 1', answerText: 'Answer 1', status: 'answered' },
            { patientId: 100000000 + i,date: new Date(), inquiryText: 'Question 2', status: 'pending' },
          ],
          appointments: [
            { patientId: 100000000 + i,date: new Date(), reason: 'General checkup' },
            { patientId: 100000000 + i,date: new Date(2024, 5, 20), reason: 'Follow-up' },
          ],
          visits: [
            { patientId: 100000000 + i,date: new Date(2023, 11, 5), description: 'Initial visit' },
            { patientId: 100000000 + i,date: new Date(2024, 2, 12), description: 'Routine checkup' },
          ],
        });
  
        await user.save();
        console.log(`Patient ${i + 1} created successfully`);
      }
  
      console.log('Initialization complete');
      mongoose.connection.close(); // Close connection when done
    } catch (error) {
      console.error('Error initializing users:', error);
    }
  }
  

  




  db.once('open', async () => {
     await initialization();
     mongoose.connection.close();
  });
  
