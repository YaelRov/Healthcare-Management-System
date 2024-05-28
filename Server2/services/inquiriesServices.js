import service from "./services.js";
import inquiriesAccess from "../dataAccess/inquiriesAccess.js";
class inquiriesServies extends service {
    constructor(dataAccess) {
        super(dataAccess);
    }


    async create(data) {
        try {
            // 1. Validate user data (add more specific validation as needed)
            if (data.idNumber||!data.dateInquiry || !data.inquiryText) {
                throw new Error('Missing required fields');
            }
            const createInquiry = await this.dataAccess.create(data);
            return createInquiry;
        } catch (err) {
            // 4. Handle errors
            console.error('Error creating inquiry:', err);
            throw err;
        }
    }
    async update(data) {
        try {
            // 1. Validate updated fields
            if (!data.answerText) {
                throw new Error('missing answerText ');
            }
            // 2. Check authorization (ensure the user has permission to update)
            // ... (add your authorization logic here)
            // 3. Update user in database
            const updatedInquiry = await this.dataAccess.update(data); // Update based on ID
            return updatedInquiry;
        } catch (err) {
            // 4. Handle errors
            console.error('Error updating user:', err);
            throw err;
        }
    }
    async getById(userId) {
        try {
            // 1. Get user from database
            const inquiries = await this.dataAccess.getById(userId);
            return inquiries;
        } catch (err) {
            // 2. Handle errors
            console.error('Error getting inquiries:', err);
            throw err;
        }
    }

    async delete(data) {
        try {
            // 1. Delete inquiry from database
            const deletedInquiry = await this.dataAccess.delete(userId);
            return deletedInquiry;
        } catch (err) {
            // 2. Handle errors
            console.error('Error deleting user:', err);
            throw err;
        }
    }
}
// // }
export default new inquiriesServies(inquiriesAccess);


