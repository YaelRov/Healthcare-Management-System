const { Inquiry, User } = require('../schema');
const { default: dataAccess } = require('./dataAccess');
class inquiryDataAccess extends dataAccess {
    constructor() {
        super()
        mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(async (connection) => {
                this.connection = connection.db; // Store the database object
                // Use the connection to get the specific collection:
                this.collection = this.connection.collection('users');  // Replace 'users' with your actual collection name

                console.log('Connected to MongoDB and collection "users"');

                // Here you can add any collection-specific initialization you need
            })
            .catch(err => {
                console.error('MongoDB connection error:', err);
                throw err; // Re-throw the error to handle it elsewhere
            });
    }


    // Function to add a new inquiry for a specific patient
    //הפרמטרים שמקבלים --- patientId, inquiryText, files = [], answerText = null
    async create(data) {
        try {
            const status = data.answerText ? 'answered' : 'pending'; // Determine status based on answerText

            // Find the user by patientId and push the new inquiry to their inquiries array
            const updatedUser = await User.findOneAndUpdate(
                { idNumber: data.patientId },
                {
                    $push: {
                        inquiries: new Inquiry({

                            dateInquiry: new Date(),
                            inquiryText: data.inquiryText,
                            answerText: data.answerText,
                            files: data.files,
                            status
                        })
                    }
                },
                { new: true } // Return the updated user document
            );

            if (!updatedUser) {
                throw new { name: "Create failed", message: "Error in creating inquiry." };
            }

            return updatedUser.inquiries.slice(-1)[0]; // Return the newly added inquiry
        } catch (err) {
            console.error('Error adding inquiry:', err);
            throw err;
        }
    }

    // Function to answer an existing inquiry for a specific patient
    // פרמטרים שלי ---- patientId, inquiryId, answerText, files = []
    async update(data) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                {
                    idNumber: data.patientId,
                    "inquiries._id": data.inquiryId // Find the specific inquiry to update
                },
                {
                    $set: {
                        "inquiries.$.answerText": data.answerText,
                        "inquiries.$.dateAnswered": new Date(),
                        "inquiries.$.status": 'answered'
                    },
                    $push: { "inquiries.$.files": { $each: data.files } }
                },
                { new: true }
            );

            if (!updatedUser) {
                throw new { name: "Update failed", message: "Error in updating inquiry." };
            }

            // Find the updated inquiry in the array and return it
            const updatedInquiry = updatedUser.inquiries.find(inquiry => inquiry._id.toString() === data.inquiryId);
            return updatedInquiry;
        } catch (err) {
            console.error('Error answering inquiry:', err);
            throw err;
        }
    }


    //הפרמטרים שהוא מקבל---- patientId,inquiryId
    async delete(data) {
        try {
            const deletedInquiry = await User.findByIdAndDelete(
                {
                    idNumber: data.patientId,
                    "inquiries._id": data.inquiryId // Find the specific inquiry to update
                },
            )

            if (!deletedInquiry) {
                throw new { name: "Delete failed", message: " Error in deleting inquiry" };
            }
            return deletedInquiry;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // async updateInquiry(patientId, inquiryId, updateFields) {
    //     try {
    //         const updatedUser = await User.findOneAndUpdate(
    //             {
    //                 idNumber: patientId,
    //                 "inquiries._id": inquiryId
    //             },
    //             { $set: { "inquiries.$": updateFields } },
    //             { new: true }
    //         );

    //         if (!updatedUser) {
    //             throw new Error(`Error to delete inquiry`);
    //         }

    //         const updatedInquiry = updatedUser.inquiries.find(inquiry => inquiry._id.toString() === inquiryId);
    //         return updatedInquiry;
    //     } catch (err) {
    //         console.error(err);
    //         throw err;
    //     }
    // }

    //הפרמטרים שאני מקבל ---- patientId,inquiryId
    async getById(id) {
        try {
            const inquiryUser = await User.findById(
                {
                    idNumber: id,
                },
            )
            return inquiryUser;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }


}
export default new inquiryDataAccess();
// module.exports = {
//     addInquiry,
//     answerInquiry,
//     deleteInquiry,
//     updateInquiry,
//     readInquiry
// };
