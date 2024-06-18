
const usersAccess = require("../dataAccess/usersAccess.js");
const bcrypt = require('bcrypt');
const { validateEmail } = require('../schema.js');

class UsersService{  
    // async getAll() { 
    //     try {
    //         const allUser = await usersAccess.getAll();
    //         return allUser;
    //     } catch (err) {
    //         console.log("error in inquiriesServies getAll");
    //         throw err; 
    //     }
    // }

    // async getByUserId(userId) {
    //     try {
    //         // Get user from database
    //         const user = await usersAccess.getByUserId(userId);
    //         return user;
    //     } catch (err) {
    //         throw err;
    //     }
    // }

        async getProfile(userId) {
        try {
            // Get user from database
            const profile = await usersAccess.getProfile(userId);
            return profile;
        } catch (err) {
            throw err;
        }
    }
    async delete(userId) {
        try {
            // Delete inquiry from database
            const deletedUser = await usersAccess.delete(userId);
            return deletedUser;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }

   

}

module.exports = new UsersService(usersAccess);
