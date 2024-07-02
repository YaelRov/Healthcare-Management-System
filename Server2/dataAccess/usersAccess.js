
const { User } = require('../schema');
const { MongoClient, ObjectId } = require('mongodb'); 
const mongoose = require('mongoose');// Import ObjectId for _id generation
const mongoUrl = process.env.MONGODB_URL;
const dbName = 'Clinic'; // Assuming your database name is 'Clinic'
const collectionName = 'users'; // Assuming your collection name is 'users'

class UsersDataAccess{  //extends DataAccess {
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

//   async getAll() {
//     try {
//         // Find all patients (users with role "patient")
//         const patients = await User.find({ profile: "patient" }).exec(); // Changed to use "profile" instead of "role"
//         return patients;
//     } catch (err) {
//         throw err; // Rethrow the error to be handled by the controller
//     }
// }
// userAccess.js (or your data access layer)
// ... (שאר הקוד אותו הדבר, כולל connectToMongoDB)

// async  create(data) {
//   const client = new MongoClient(mongoUrl);

//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     // Generate a unique _id for the new user (if needed)
//     data._id = new ObjectId(); 

//     const result = await collection.insertOne(data);
//     // return data;
//     return result.ops[0]; // Return the inserted user document
//   } catch (error) {
//     console.error('Error creating user:', error.message);
//     throw error; // Rethrow the error to handle it in the controller
//   } finally {
//     client.close();
//   }
// }

// async  create(data) {
//   const client = new MongoClient(mongoUrl);

//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     // Generate a unique _id for the new user (if needed)
//     data._id = new ObjectId(); 

//     const result = await collection.insertOne(data);
    
//     // Return the inserted user document
//     return result.ops[0]; // No need to update inquiries here

//   } catch (error) {
//     console.error('Error creating user:', error.message);
//     throw error; // Rethrow the error to handle it in the controller
//   } finally {
//     client.close();
//   }
// }



// async  create(data) {
//   try {
//       mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
//       const db = mongoose.connection;

//       db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//       db.once('open', async () => {
//           try {
//                   await data.save();
//                   console.log(`Patient created successfully`);
//           } catch (error) {
//               console.error('Error initializing users:', error);
//           } finally {
//               mongoose.connection.close(); // Close connection when done
//           }
//           return data;
//       });

//   } catch (error) {
//       console.error('Error initializing users:', error);
//   }
// }


// async  create(data) {
//   const client = new MongoClient(mongoUrl);

//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     data._id = new ObjectId(); 

//     const result = await collection.insertOne(data);
//     console.log("Patient created successfully:", result.ops[0]); // Log the created user
//     return result.ops[0];
//   } catch (error) {
//     console.error('Error creating user:', error);
//     throw error; 
//   } finally {
//     client.close();
//   }
// }




async  create(data) {
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
