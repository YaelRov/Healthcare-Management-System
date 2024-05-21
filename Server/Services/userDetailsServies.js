const userDetailsSchema = require('./schemas/userDetailsSchema');
const UserDetailes = mongoose.model('UserDetailes', userDetailsSchema); 

async function addDetailsUser( userId,userName,dateOfBirth,address,email,phoneNumber) {
    try {
      const userDetails = new userDetails({ userId, userName ,    dateOfBirth,address,email,phoneNumber});
      await userDetails.save(); // Save details  user to the database
      return userDetails;
    } catch (err) {
      console.error(err);
      throw err; 
    }
  }






  module.exports = {
    addDetailsUser
  }