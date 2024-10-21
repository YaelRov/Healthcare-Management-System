const mongoose = require('mongoose');
const { Inquiry, User } = require('../schema');
const DataAccess = require('./dataAccess');
const { ObjectId } = require('mongodb');


class InquiryDataAccess extends DataAccess {
    async create(data) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { idNumber: data.patientId },
                {
                    $push: {
                        inquiries: new Inquiry({
                            patientId: data.patientId,
                            dateInquiry: data.dateInquiry,
                            inquiryText: data.inquiryText,
                            files: data.files || null,
                            status: data.status
                        })
                    }
                },
                { new: true }
            );

            if (!updatedUser) {
                throw { name: "Create failed", message: "Error in creating inquiry." };
            }

            return updatedUser.inquiries.slice(-1)[0];
        } catch (err) {
            console.error('Error adding inquiry:', err);
            throw err;
        }
    }

    async update(data) {
        try {
            const updateObject = {
                $set: {
                    "inquiries.$.answerText": data.answerText,
                    "inquiries.$.dateAnswered": new Date(),
                    "inquiries.$.status": "answered",
                },
            };

            // Conditionally add the $push operation
            if (data.files && data.files.length > 0) {
                updateObject.$push = { "inquiries.$.files": { $each: data.files } };
            }

            const updatedUser = await User.findOneAndUpdate(
                {
                    idNumber: data.patientId,
                    "inquiries._id": data.inquiryId,
                },
                updateObject,
                { new: true }
            );

            if (!updatedUser) {
                throw {
                    name: "Update failed",
                    message: "Error in updating inquiry.",
                };
            }

            const updatedInquiry = updatedUser.inquiries.find(
                (inquiry) => inquiry._id.toString() === data.inquiryId
            );
            return updatedInquiry;
        } catch (err) {
            console.error("Error updating inquiry:", err);
            throw err;
        }
    }



    async delete(userId, id) {
        try {
            const deletedInquiry = await User.findOneAndUpdate(
                {
                    idNumber: userId,
                    "inquiries._id": id
                },
                { $pull: { inquiries: { _id: id } } },
                { new: true }
            );

            if (!deletedInquiry) {
                throw { name: "Delete failed", message: "Error in deleting inquiry." };
            }
            return deletedInquiry;
        } catch (err) {
            console.error('Error deleting inquiry:', err);
            throw err;
        }
    }

    async getByUserId(id) {
        try {
            const user = await User.findOne({ idNumber: id });
            if (user) {
                return user.inquiries;
            } else {
                throw { name: "User not found", message: "No user found with the given id." };
            }
        } catch (err) {
            console.error('Error getting inquiries by user id:', err);
            throw err;
        }
    }
    async getAll() {
        try {
            // Find all patients (users with role "patient")
            const patients = await User.find({ profile: 0 }).exec(); // Changed to use "profile" instead of "role"

            // Extract inquiries from each patient
            const allInquiries = patients.flatMap(patient => patient.inquiries); // Assuming patient.inquiries is an array

            return allInquiries;
        } catch (err) {
            throw err; // Rethrow the error to be handled by the controller
        }
    }
    async getByItemId(userId, inquiryId) {
        try {
            // Find the patient with the given ID
            const patient = await User.findOne({ idNumber: userId }).exec();

            if (!patient) {
                throw new Error("Patient not found"); // Throw an error if the patient doesn't exist
            }

            // Find the inquiry with the given ID within the patient's inquiries
            const inquiry = patient.inquiries.find(inquiry => inquiry._id.toString() === inquiryId);

            if (!inquiry) {
                throw new Error("Inquiry not found"); // Throw an error if the inquiry doesn't exist
            }

            return inquiry;
        } catch (err) {
            throw err; // Rethrow the error to be handled by the controller
        }
    }
}

module.exports = new InquiryDataAccess();



