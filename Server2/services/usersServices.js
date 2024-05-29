const Service = require("./services.js");
const usersAccess = require("../dataAccess/usersAccess.js");
const bcrypt = require('bcrypt');
const { validateEmail } = require('../schema.js');

class UsersService extends Service {
    constructor(dataAccess) {
        super(dataAccess);
    }

    async create(data) {
        try {
            // Validate user data
            if (!data.email || !data.password || !data.firstName || !data.lastName) {
                throw new Error('Missing required fields');
            }

            if (!validateEmail(data.email)) {
                throw new Error('Invalid email address');
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;

            // Create user in database
            const createdUser = await this.dataAccess.create(data);
            return createdUser;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }

    async update(data) {
        try {
            // Validate updated fields
            if (data.email && !validateEmail(data.email)) {
                throw new Error('Invalid email address');
            }

            // Check authorization
            // Implement authorization logic here

            // Update user in database
            const updatedUser = await this.dataAccess.update(data);
            return updatedUser;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }

    async getById(userId) {
        try {
            // Get user from database
            const user = await this.dataAccess.getById(userId);
            return user;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }

    async delete(userId) {
        try {
            // Delete user from database
            const deletedUser = await this.dataAccess.delete(userId);
            return deletedUser;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }

}

module.exports = new UsersService(usersAccess);
