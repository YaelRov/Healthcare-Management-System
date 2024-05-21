// const userSchema = require('./schemas/userSchema');
// const User = mongoose.model('User', userSchema); // Assuming you have the User model defined


const passwordsSchema=require('./schemas/passworsSchema')
const passwors=mongoose.model('Passwors',passwordsSchema );

async function addUser(idNumber, password,) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = new passwors({ idNumber, password: hashedPassword }); // Create a new user object
    await user.save(); // Save the user to the database
    return user;
  } catch (err) {
    console.error(err);
    throw err; 
  }
}



 // Assuming you have the User model defined

async function deleteUser(userId) {
  try {
    const deletedUser = await User.findOneAndDelete({ idNumber: userId });
    if (!deletedUser) {
      throw new Error(`User with ID ${userId} not found.`);
    }
    return deletedUser; // Optionally return the deleted user object
  } catch (err) {
    console.error(err);
    throw err; 
  }
}


async function updatePassword(userId, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
      const updatedUser = await UserDetailes.findOneAndUpdate(
        { idNumber: userId },
        { password: hashedPassword },
        { new: true } // Return the updated user object
      );
  
      if (!updatedUser) {
        throw new Error(`User with ID ${userId} not found.`);
      }
      return updatedUser; 
    } catch (err) {
      console.error(err);
      throw err; 
    }
  }

  async function readUser(userId) {
    try {
      const user = await User.findOne({ idNumber: userId });
      if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
      }
      return user;
    } catch (err) {
      console.error(err);
      throw err; 
    }
  }

  module.exports = {
    readUser,
    updatePassword,
    deleteUser,
    addUser,
   
  };

