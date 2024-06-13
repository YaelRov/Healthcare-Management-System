const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { User, Email, Password } = require('../schema');
class loginDataAccess {
    async getEmail(userId) {
        try {
            const user = await User.findOne({ idNumber: userId });
            if (user) {
                return user.email.email;
            } else {
                throw { name: "User not found", message: "No user found with the given id." };
            }
        }
        catch (err) {
            console.error('Error getting inquiries by user id:', err);
            throw err;
        }
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
            user.passwordHash.failedAttempts = newPasswordSchema.failedAttempts;



            // Save the updated user
            await user.save();

            return user; // Return the updated user object (optional)
        } catch (err) {
            console.error("Error updating user password:", err);
            throw err;
        }
    }


    async getByUserId(userId, password) {
        try {
            // 1. מציאת המשתמש לפי המזהה
            const user = await User.findOne({ idNumber: userId });
            let returnedObj;
            // 2. בדיקה אם המשתמש קיים
            if (!user) {
                returnedObj = {
                    success: false,
                    message: 'User not found'
                };
            }

            // 3. בדיקת תוקף הסיסמה
            else {
                if (!user.passwordHash.valid || user.passwordHash.expireDate < new Date()) {
                    returnedObj = {
                        success: false,
                        message: 'Invalid password'
                    };
                }

                // 4. בדיקת מספר ניסיונות ההתחברות הכושלים
                else {
                    if (user.passwordHash.failedAttempts >= 3) {
                        returnedObj = {
                            success: false,
                            message: 'Maximum number of attempts'
                        };
                    }
                    else {
                        // 5. השוואת הסיסמה המוגשת לסיסמה מהבקשה
                        const isMatch = await bcrypt.compare(password, user.passwordHash.password);

                        if (isMatch) {
                            user.passwordHash.valid = false;
                            returnedObj = {
                                success: true,
                                user: user
                            };
                        }

                        else {
                            returnedObj = {
                                success: false,
                                message: "Incorrect password"
                            }
                        }
                    }
                }

                user.passwordHash.failedAttempts += 1;
                await user.save();
                return returnedObj;

            }
        } catch (err) {
            console.error("Error validating password:", err);
            throw err;
        }
    }
}




module.exports = new loginDataAccess();

