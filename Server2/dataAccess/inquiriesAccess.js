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
                            patientId:data.patientId,
                            dateInquiry:data.dateInquiry,
                            inquiryText: data.inquiryText,
                            files: data.files||null,
                            status:data.status
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
      


    async delete (userId, id) {
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
        const patients = await User.find({ profile: "patient" }).exec(); // Changed to use "profile" instead of "role"

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




// const mongoose = require('mongoose');
// const { Inquiry, User } = require('../schema');
// const DataAccess = require('./dataAccess');

// class InquiryDataAccess extends DataAccess {
//     constructor() {
//         super();
//         mongoose.connect(process.env.MONGODB_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         })
//             .then(async (connection) => {
//                 this.connection = connection.db; // Store the database object
//                 // Use the connection to get the specific collection:
//                 this.collection = this.connection.collection('users');  // Replace 'users' with your actual collection name

//                 console.log('Connected to MongoDB and collection "users"');

//                 // Here you can add any collection-specific initialization you need
//             })
//             .catch(err => {
//                 console.error('MongoDB connection error:', err);
//                 throw err; // Re-throw the error to handle it elsewhere
//             });
//     }


//     // Function to add a new inquiry for a specific patient
//     //הפרמטרים שמקבלים --- patientId, inquiryText, files = [], answerText = null
//     async create(data) {
//         try {
//             const status = data.answerText ? 'answered' : 'pending'; // Determine status based on answerText

//             // Find the user by patientId and push the new inquiry to their inquiries array
//             const updatedUser = await User.findOneAndUpdate(
//                 { idNumber: data.patientId },
//                 {
//                     $push: {
//                         inquiries: new Inquiry({

//                             dateInquiry: new Date(),
//                             inquiryText: data.inquiryText,
//                             answerText: data.answerText,
//                             files: data.files,
//                             status
//                         })
//                     }
//                 },
//                 { new: true } // Return the updated user document
//             );

//             if (!updatedUser) {
//                 throw { name: "Create failed", message: "Error in creating inquiry." };
//             }

//             return updatedUser.inquiries.slice(-1)[0]; // Return the newly added inquiry
//         } catch (err) {
//             console.error('Error adding inquiry:', err);
//             throw err;
//         }
//     }

//     // Function to answer an existing inquiry for a specific patient
//     // פרמטרים שלי ---- patientId, inquiryId, answerText, files = []
//     async update(data) {
//         try {
//             const updatedUser = await User.findOneAndUpdate(
//                 {
//                     idNumber: data.patientId,
//                     "inquiries._id": data.inquiryId // Find the specific inquiry to update
//                 },
//                 {
//                     $set: {
//                         "inquiries.$.answerText": data.answerText,
//                         "inquiries.$.dateAnswered": new Date(),
//                         "inquiries.$.status": 'answered'
//                     },
//                     $push: { "inquiries.$.files": { $each: data.files } }
//                 },
//                 { new: true }
//             );

//             if (!updatedUser) {
//                 throw { name: "Update failed", message: "Error in updating inquiry." };
//             }

//             // Find the updated inquiry in the array and return it
//             const updatedInquiry = updatedUser.inquiries.find(inquiry => inquiry._id.toString() === data.inquiryId);
//             return updatedInquiry;
//         } catch (err) {
//             console.error('Error answering inquiry:', err);
//             throw err;
//         }
//     }


//     //הפרמטרים שהוא מקבל---- patientId,inquiryId
//     async delete(data) {
//         try {
//             const deletedInquiry = await User.findByIdAndDelete(
//                 {
//                     idNumber: data.patientId,
//                     "inquiries._id": data.inquiryId // Find the specific inquiry to update
//                 },
//             )

//             if (!deletedInquiry) {
//                 throw { name: "Delete failed", message: " Error in deleting inquiry" };
//             }
//             return deletedInquiry;
//         } catch (err) {
//             console.error(err);
//             throw err;
//         }
//     }

//     // async updateInquiry(patientId, inquiryId, updateFields) {
//     //     try {
//     //         const updatedUser = await User.findOneAndUpdate(
//     //             {
//     //                 idNumber: patientId,
//     //                 "inquiries._id": inquiryId
//     //             },
//     //             { $set: { "inquiries.$": updateFields } },
//     //             { new: true }
//     //         );

//     //         if (!updatedUser) {
//     //             throw new Error(`Error to delete inquiry`);
//     //         }

//     //         const updatedInquiry = updatedUser.inquiries.find(inquiry => inquiry._id.toString() === inquiryId);
//     //         return updatedInquiry;
//     //     } catch (err) {
//     //         console.error(err);
//     //         throw err;
//     //     }
//     // }

//     //הפרמטרים שאני מקבל ---- patientId,inquiryId
//     async getById(id) {
//         try {
//             const inquiryUser = await User.findById(
//                 {
//                     idNumber: id,
//                 },
//             )
//             return inquiryUser;
//         } catch (err) {
//             console.error(err);
//             throw err;
//         }
//     }


// }
// module.exports = new InquiryDataAccess
