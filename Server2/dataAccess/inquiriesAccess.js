const { Inquiry, User } = require('../schema');



// Function to add a new inquiry for a specific patient
async function addInquiry(patientId, inquiryText, files = [], answerText = null) {
    try {
        const status = answerText ? 'answered' : 'pending'; // Determine status based on answerText

        // Find the user by patientId and push the new inquiry to their inquiries array
        const updatedUser = await User.findOneAndUpdate(
            { idNumber: patientId },
            {
                $push: {
                    inquiries: new Inquiry({
                        
                        dateInquiry: new Date(),
                        inquiryText,
                        answerText,
                        files,
                        status
                    })
                }
            },
            { new: true } // Return the updated user document
        );

        if (!updatedUser) {
            throw new Error(`User with ID ${patientId} not found.`);
        }

        return updatedUser.inquiries.slice(-1)[0]; // Return the newly added inquiry
    } catch (err) {
        console.error('Error adding inquiry:', err);
        throw err;
    }
}

// Function to answer an existing inquiry for a specific patient
async function answerInquiry(patientId, inquiryId, answerText, files = []) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            {
                idNumber: patientId,
                "inquiries._id": inquiryId // Find the specific inquiry to update
            },
            {
                $set: {
                    "inquiries.$.answerText": answerText,
                    "inquiries.$.dateAnswered": new Date(),
                    "inquiries.$.status": 'answered'
                },
                $push: { "inquiries.$.files": { $each: files } }
            },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error(`Inquiry with ID ${inquiryId} for patient with ID ${patientId} not found.`);
        }

        // Find the updated inquiry in the array and return it
        const updatedInquiry = updatedUser.inquiries.find(inquiry => inquiry._id.toString() === inquiryId);
        return updatedInquiry;
    } catch (err) {
        console.error('Error answering inquiry:', err);
        throw err;
    }
}



async function deleteInquiry(patientId,inquiryId) {
    try {
        const deletedInquiry = await User.findByIdAndDelete(
            {
                idNumber: patientId,
                "inquiries._id": inquiryId // Find the specific inquiry to update
            },
        )
   
        if (!deletedInquiry) {
            throw new Error(`Error deleteInquiry`);
        }
        return deletedInquiry;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function updateInquiry(patientId, inquiryId, updateFields) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            {
                idNumber: patientId,
                "inquiries._id": inquiryId
            },
            { $set: { "inquiries.$": updateFields } },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error(`Error to delete inquiry`);
        }

        const updatedInquiry = updatedUser.inquiries.find(inquiry => inquiry._id.toString() === inquiryId);
        return updatedInquiry;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


async function readInquiry(patientId,inquiryId) {
    try {
        const inquiryUser = await User.findById(
            {
                idNumber: patientId,
                "inquiries._id": inquiryId // Find the specific inquiry to update
            },
        )
        if (!inquiryUser) {
            throw new Error(`Error to reading Inquiry`);
        }
        return inquiryUser;
    } catch (err) {
        console.error(err);
        throw err;
    }
}



module.exports = {
    addInquiry,
    answerInquiry,
    deleteInquiry,
    updateInquiry,
    readInquiry
};
