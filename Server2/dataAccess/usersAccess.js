

const mongoose = require('mongoose');
const { User, validateEmail, Email, Address } = require('../schema');
const { default: dataAccess } = require('./dataAccess');

class usersDataAccess extends dataAccess {
  constructor() {
    super()
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(async (connection) => {
        this.connection = connection.db; // Store the database object
        // Use the connection to get the specific collection:
        this.collection = this.connection.collection('users');  // Replace 'users' with your actual collection name

        console.log('Connected to MongoDB and collection "users"');

        // Here you can add any collection-specific initialization you need
      })
      .catch(err => {
        console.error('MongoDB connection error:', err);
        throw err; // Re-throw the error to handle it elsewhere
      });


  }
  //params --- idNumber, firstName, lastName, dateOfBirth, city, street, number, phoneNumber, email, password, profile
  async create(data) {
    try {

      const user = new User({
        idNumber: data.idNumber, firstName: data.firstName, lastName: data.lastName, dateOfBirth: data.dateOfBirth,
        address: { city: data.city, street: data.street, number: data.number },
        phoneNumber: data.phoneNumber, email: { email: data.email },
        password: data.password, profile: data.profile
      }); // Create a new user object
      await user.save(); // Save the user to the database
      return user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  //params --- userId
  async delete(data) {
    try {
      const deletedUser = await User.findOneAndDelete({ idNumber: data.idNumber });
      if (!deletedUser) {
        throw new Error(`Error in deleting user`);
      }
      return deletedUser; // Optionally return the deleted user object
    } catch (err) {
      console.error(err);
      throw err;
    }
  }


  //params --- userId, userFields
  async update(data) {
    try {
      const updates = { $set: {} };


      for (const field in data.userFields) {
        if (field === 'email') {
          updates.$set.email = { email: data.email };
        } else if (field === 'address') {
          updates.$set.address = {address: data.address};
        } else {
          updates.$set[field] = data[field];
        }
      }

      const updatedUser = await User.findOneAndUpdate(
        { idNumber: data.idNumber },
        updates,
        { new: true }
      );

      if (!updatedUser) {
        throw new Error(`Error in updating user.`);
      }

      return updatedUser;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }


  async getById(id) {
    try {
      const user = await User.findOne({ idNumber: id });
      if (!user) {
        throw new Error(`Error in reading user`);
      }
      return user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
export default new usersDataAccess();
// module.exports = {
//   readUser,
//   updateUser,
//   deleteUser,
//   addUser
// };



//====================================================================================

