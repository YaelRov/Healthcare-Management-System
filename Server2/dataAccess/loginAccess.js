
const mongoose = require('mongoose');
const { User,Email,Password } = require('../schema');
class loginDataAccess {
    async getEmail(userId) {
        const user = await User.findOne({ idNumber: userId });
        if (user) {
            return user.email.email;
        } else {
            throw { name: "User not found", message: "No user found with the given id." };
        }
    } catch(err) {
        console.error('Error getting inquiries by user id:', err);
        throw err;
    }
    async updatePassword(userId, newPasswordSchema) {
        try {
            // Find the user by idNumber
            const user = await User.findOne({ idNumber: userId });

            if (!user) {
                throw new Error(`User with ID ${userId} not found`);
            }
            if (!user.passwordHash) {
                user.passwordHash = new Password();
            }

            // Update the user's password-related fields
            user.passwordHash.password = newPasswordSchema.password; // Update the password hash
            user.passwordHash.expireDate = newPasswordSchema.expireDate;
            user.passwordHash.valid = newPasswordSchema.valid === "true";

            // Save the updated user
            await user.save();

            return user; // Return the updated user object (optional)
        } catch (err) {
            console.error("Error updating user password:", err);
            throw err;
        }
    }
}
module.exports = new loginDataAccess();

   