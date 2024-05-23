


const { User, validateEmail,Email,Address } = require('../schema'); 


async function addUser( idNumber,firstName,lastName,dateOfBirth,city,street,number,phoneNumber,email,password,profile) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const addresssUser=new Address({city,street,number});
    const emailUser=new Email({email});
    const user = new User ({ idNumber,firstName,lastName,dateOfBirth,address:addresssUser,phoneNumber,email:emailUser, password: hashedPassword,profile }); // Create a new user object
    await user.save(); // Save the user to the database
    return user;
  } catch (err) {
    console.error(err);
    throw err; 
  }
}

async function deleteUser(userId) {
  try {
    const deletedUser = await User.findOneAndDelete({ idNumber: userId });
    if (!deletedUser) {
      throw new Error(`Error in deleting user`);
    }
    return deletedUser; // Optionally return the deleted user object
  } catch (err) {
    console.error(err);
    throw err; 
  }
}



async function updateUser(userId, userFields) {
  try {
    const updates = { $set: {} }; 


    for (const field in userFields) {
      if (field === 'email') {
        updates.$set.email = new EmailSchema({ email: userFields.email });
      } else if (field === 'address') {
        updates.$set.address = userFields.address;
      } else {
        updates.$set[field] = userFields[field]; 
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      { idNumber: userId },  
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


  async function readUser(userId) {
    try {
      const user = await User.findOne({ idNumber: userId });
      if (!user) {
        throw new Error(`Error in reading user`);
      }
      return user;
    } catch (err) {
      console.error(err);
      throw err; 
    }
  }

  module.exports = {
    readUser,
    updateUser,
    deleteUser,
    addUser
  };

