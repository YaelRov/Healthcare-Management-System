const mongoose = require('mongoose');
const { User } = require('../schema');
const DataAccess = require('./dataAccess');

class UsersDataAccess extends DataAccess {
  constructor() {
    super();
  }

  async create(data) {
    try {
      return await super.create(data, User);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async delete(id) {
    try {
      return await super.delete(id, User);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async update(id, data) {
    try {
      return await super.update(id, data, User);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getById(id) {
    try {
      return await super.getById(id, User);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = new UsersDataAccess();



// const mongoose = require('mongoose');
// const { User } = require('../schema');
// const DataAccess = require('./dataAccess');

// class UsersDataAccess extends DataAccess {
//   constructor() {
//     super();
//     mongoose.connect(process.env.MONGODB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     })
//       .then(async (connection) => {
//         this.connection = connection.db; // Store the database object
//         // Use the connection to get the specific collection:
//         this.collection = this.connection.collection('users');  // Replace 'users' with your actual collection name

//         console.log('Connected to MongoDB and collection "users"');

//         // Here you can add any collection-specific initialization you need
//       })
//       .catch(err => {
//         console.error('MongoDB connection error:', err);
//         throw err; // Re-throw the error to handle it elsewhere
//       });
//   }

//   async create(data) {
//     try {
//       const user = new User({
//         idNumber: data.idNumber, firstName: data.firstName, lastName: data.lastName, dateOfBirth: data.dateOfBirth,
//         address: { city: data.city, street: data.street, number: data.number },
//         phoneNumber: data.phoneNumber, email: { email: data.email },
//         password: data.password, profile: data.profile
//       });
//       await user.save();
//       return user._id;
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   }

//   async delete(data) {
//     try {
//       const deletedUser = await User.findOneAndDelete({ idNumber: data.idNumber });
//       if (!deletedUser) {
//         throw { name: "Delete failed", message: "Error in deleting user" };
//       }
//       return deletedUser;
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   }

//   async update(data) {
//     try {
//       const updates = { $set: {} };

//       for (const field in data.userFields) {
//         if (field === 'email') {
//           updates.$set.email = { email: data.email };
//         } else if (field === 'address') {
//           updates.$set.address = { address: data.address };
//         } else {
//           updates.$set[field] = data[field];
//         }
//       }

//       const updatedUser = await User.findOneAndUpdate(
//         { idNumber: data.idNumber },
//         updates,
//         { new: true }
//       );

//       if (!updatedUser) {
//         throw { name: "Update failed", message: "Error in updating user" };
//       }

//       return updatedUser;
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   }

//   async getById(id) {
//     try {
//       const user = await User.findOne({ idNumber: id });
//       return user;
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   }
// }

// module.exports = new UsersDataAccess();
