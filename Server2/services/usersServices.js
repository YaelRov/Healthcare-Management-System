import service from "./services.js";
import usersAccess from "../dataAccess/usersAccess.js";
const bcrypt = require('bcrypt');
const { User, validateEmail, Email, Address } = require('../schema.js');

class usersService extends service {
    constructor(dataAccess) {
        super(dataAccess);
    }

    async create(data) {
        try {
            // 1. Validate user data (add more specific validation as needed)
            if (data.userId||!data.email || !data.password || !data.firstName || !data.lastName) {
                throw new Error('Missing required fields');
            }

            if (!validateEmail(data.email)) {
                throw new Error('Invalid email address');
            }
            // 2. Hash password
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;

            // 3. Create user in database
            const createdUser = await this.dataAccess.create(data);
            return createdUser;
        } catch (err) {
            // 4. Handle errors
            console.error('Error creating user:', err);
            throw new Error('Failed to create user');
        }
    }

    async update(data) {
        try {
            // 1. Validate updated fields
            if (data.email && !validateEmail(data.email)) {
                throw new Error('Invalid email address');
            }

            // 2. Check authorization (ensure the user has permission to update)
            // ... (add your authorization logic here)

            // 3. Update user in database
            const updatedUser = await this.dataAccess.update(data); // Update based on ID
            return updatedUser;
        } catch (err) {
            // 4. Handle errors
            console.error('Error updating user:', err);
            throw new Error('Failed to update user');
        }
    }
    async getById(userId) {
        try {
            // 1. Get user from database
            const user = await this.dataAccess.getById(userId);
            return user;
        } catch (err) {
            // 2. Handle errors
            console.error('Error getting user:', err);
            throw new Error('Failed to get user');
        }
    }

    async delete(userId) {
        try {
            // 1. Delete user from database
            const deletedUser = await this.dataAccess.delete(userId);
            return deletedUser;
        } catch (err) {
            // 2. Handle errors
            console.error('Error deleting user:', err);
            throw new Error('Failed to delete user');
        }
    }

}
export default new usersService(usersAccess);


