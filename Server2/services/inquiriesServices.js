const Service = require("./services.js");
const inquiriesAccess = require("../dataAccess/inquiriesAccess.js");

class InquiriesService extends Service {
    constructor(dataAccess) {
        super(dataAccess);
    }

    async create(data) {
        try {
            // Validate inquiry data
            if (!data.idNumber || !data.dateInquiry || !data.inquiryText) {
                throw new Error('Missing required fields');
            }

            // Create inquiry in database
            const createdInquiry = await this.dataAccess.create(data);
            return createdInquiry;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }

    async update(data) {
        try {
            // Validate updated fields
            if (!data.answerText) {
                throw new Error('Missing answerText');
            }

            // Check authorization
            // Implement authorization logic here

            // Update inquiry in database
            const updatedInquiry = await this.dataAccess.update(data);
            return updatedInquiry;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }

    async getById(userId) {
        try {
            // Get inquiries by user ID from database
            const inquiries = await this.dataAccess.getById(userId);
            return inquiries;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }

    async delete(userId) {
        try {
            // Delete inquiry from database
            const deletedInquiry = await this.dataAccess.delete(userId);
            return deletedInquiry;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }
}

module.exports = new InquiriesService(inquiriesAccess);
