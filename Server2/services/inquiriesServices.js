const Service = require("./services.js");
const inquiriesAccess = require("../dataAccess/inquiriesAccess.js");

class InquiriesService {
    async create(data) {
        try {
            if (!data.patientId || !data.inquiryText) {
                throw new Error('Missing required fields');
            }
            const fullDataObj = {
                ...data,
                status: "pending",
                dateInquiry: new Date(),
            }
            // Validate inquiry data


            // Create inquiry in database
            const createdInquiry = await inquiriesAccess.create(fullDataObj);
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
            const updatedInquiry = await inquiriesAccess.update(data);
            return updatedInquiry;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }

    async getByUserId(userId) {
        try {
            console.log("inquiriesServies getById");
            // Get inquiries by user ID from database
            const inquiries = await inquiriesAccess.getByUserId(userId);
            return inquiries;
        } catch (err) {
            // Handle errors
            console.log("error in inquiriesServies getById")
            throw err;
        }
    }
    async getAll() { // New getAll function
        try {
            console.log("inquiriesServies getAll");
            const allInquiries = await inquiriesAccess.getAll();
            return allInquiries;
        } catch (err) {
            console.log("error in inquiriesServies getAll");
            throw err;
        }
    }
    async getByItemId(userId, id) {
        try {
            console.log("inquiriesServies getByIdInquriresId");
            // Get inquiries by user ID from database
            const inquiries = await inquiriesAccess.getByItemId(userId, id);
            return inquiries;
        } catch (err) {
            // Handle errors
            console.log("error in inquiriesServies getById")
            throw err;
        }
    }

    async delete(userId, id) {
        try {
            // Delete inquiry from database
            const deletedInquiry = await inquiriesAccess.delete(userId, id);
            return deletedInquiry;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }
}

module.exports = new InquiriesService(inquiriesAccess);
