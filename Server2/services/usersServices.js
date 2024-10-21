
const usersAccess = require("../dataAccess/usersAccess.js");
const bcrypt = require('bcrypt');
const { validateEmail, Email } = require('../schema.js');
const validator = require('validator');
//  const Email = require("mongoose-type-email");




class UsersService {
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

    async create(data) {
        try {


            if (!data.idNumber || data.profile == null || data.profile == undefined || !data.email || !data.phoneNumber || !data.address || !data.dateOfBirth
                || !data.lastName || !data.firstName
            ) {
                throw new Error('Missing required fields');
            }
            // if (!validator.isEmail(data.email)) {
            //     throw new Error('Invalid email address');
            // }
            const emailObject = new Email({ email: data.email });
            // await emailObject.validate(); // This will throw an error if the email is invalid

            // Update the data object with the validated email object
            const updatedData = {
                ...data, // Copy all other fields from data
                email: emailObject,
                inquiries: null,
                appointments: null,
                visits: null

                // Replace the email string with the Email object
            };
            // Create appointment in database
            const createdUser = await usersAccess.create(updatedData);
            console.log(createdUser.idNumber);
            return createdUser;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }

    async update(id, data) {
        try {
            const existingUser = await usersAccess.getByUserId(id);
            const emailObject = new Email({ email: data.email });
            const updatedData = {
                idNumber: id,
                email: emailObject || existingUser.email,
                phoneNumber: data.phoneNumber || existingUser.phoneNumber,
                address: {
                    city: data.address.city || existingUser.address.city,
                    street: data.address.street || existingUser.address.street,
                    number: data.address.number || existingUser.address.number
                }
            };


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
