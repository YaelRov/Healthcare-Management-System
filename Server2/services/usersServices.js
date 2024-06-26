
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

    async update( id,data) {
        try {
            const existingUser = await usersAccess.getByUserId( id); 
            const updatedData = {
                idNumber:id,
                email: data.email||existingUser.email,
                phoneNumber: data.phoneNumber||existingUser.phoneNumber,
                address: {
                    city: data.address.city||existingUser.address.city,
                    street: data.address.street||existingUser.address.street,
                    number: data.address.number||existingUser.address.number
                }
            };
         
            // Validate updated fields
        
            // Check authorization
            // Implement authorization logic here

            // Update appointment in database
            const updatedUser = await usersAccess.update(updatedData);
            return updatedUser;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }

    


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
