
const { User } = require('../schema');
const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose');// Import ObjectId for _id generation
const mongoUrl = process.env.MONGODB_URL;
const dbName = 'Clinic'; // Assuming your database name is 'Clinic'
const collectionName = 'users'; // Assuming your collection name is 'users'

class UsersDataAccess {  //extends DataAccess {
  // constructor() {
  //   super();
  // }


  // async create(data) {
  //   try {
  //     return await super.create(data, User);
  //   } catch (err) {
  //     console.error(err);
  //     throw err;
  //   }
  // }

  async delete(userId) {
    try {
      const deletedUser = await User.findOneAndDelete({ idNumber: userId });

      if (!deletedUser) {
        throw new Error(`User with ID ${userId} not found`);
      }
      return deletedUser;
    } catch (err) {
      console.error("Error deleting user:", err);
      throw err;
    }
  }


  async update(data) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { idNumber: data.idNumber },
        {
          $set: {
            email: data.email,
            phoneNumber: data.phoneNumber,
            'address.city': data.address.city,
            'address.street': data.address.street,
            'address.number': data.address.number
          }
        },
        { new: true }
      );

      if (!updatedUser) {
        throw { name: "Update failed", message: "Error in updating user." };
      }


      return updatedUser;
    } catch (err) {
      console.error('Error updating appointment:', err.message);
      throw err;
    }
  }

  // async update(id, data) {
  //   try {
  //     return await super.update(id, data, User);
  //   } catch (err) {
  //     console.error(err);
  //     throw err;
  //   }
  // }

  async getByUserId(id) {
    try {
      const user = await User.findOne({ idNumber: id }).select('-passwordHash');
      if (user) {
        return user;
      } else {
        throw { name: "User not found", message: "No user found with the given id." };
      }
    } catch (err) {
      console.error('Error getting inquiries by user id:', err);
      throw err;
    }
  }




  async create(data) {
    try {
      await mongoose.connect(mongoUrl);
      console.log('Connected to MongoDB');

      const user = new User(data);
      const savedUser = await user.save();
      console.log('User created successfully:', savedUser.idNumber);

      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw error;
    } finally {
      // Close the connection using mongoose.connection
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  }





  // ... (שאר הפונקציות)









  async getProfile(userId) {
    try {
      const user = await User.findOne({ idNumber: userId }).select('profile'); // אחזר רק את השדה profile

      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      return { profile: user.profile }; // החזר רק את הערך של profile
    } catch (err) {
      console.error('Error getting user profile:', err);
      throw err;
    }
  }

}



module.exports = new UsersDataAccess();


