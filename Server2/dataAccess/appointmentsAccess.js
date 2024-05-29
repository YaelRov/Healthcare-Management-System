const mongoose = require('mongoose');
const { Appointment, User } = require('../schema');
const DataAccess = require('./dataAccess');

class AppointmentDataAccess extends DataAccess {
    async create(data) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { idNumber: data.patientId },
                {
                    $push: {
                        appointments: new Appointment({
                            date: data.date,
                            reason: data.reason
                        })
                    }
                },
                { new: true }
            );

            if (!updatedUser) {
                throw { name: "Create failed", message: "Error in creating appointment." };
            }

            return updatedUser.appointments.slice(-1)[0];
        } catch (err) {
            console.error('Error adding appointment:', err);
            throw err;
        }
    }

    async delete(data) {
        try {
            const deletedAppointment = await User.findOneAndUpdate(
                { idNumber: data.patientId },
                { $pull: { appointments: { _id: data.appointmentId } } },
                { new: true }
            );

            if (!deletedAppointment) {
                throw { name: "Delete failed", message: "Error in deleting appointment." };
            }
            return deletedAppointment;
        } catch (err) {
            console.error('Error deleting appointment:', err);
            throw err;
        }
    }

    async update(data) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { idNumber: data.patientId, "appointments._id": data.appointmentId },
                {
                    $set: {
                        "appointments.$.date": data.date,
                        "appointments.$.reason": data.reason
                    }
                },
                { new: true }
            );

            if (!updatedUser) {
                throw { name: "Update failed", message: "Error in updating appointment." };
            }

            const updatedAppointment = updatedUser.appointments.find(appointment => appointment._id.toString() === data.appointmentId);
            return updatedAppointment;
        } catch (err) {
            console.error('Error updating appointment:', err);
            throw err;
        }
    }

    async getById(id) {
        try {
            const user = await User.findOne({ idNumber: id });
            if (user) {
                return user.appointments;
            } else {
                throw { name: "User not found", message: "No user found with the given id." };
            }
        } catch (err) {
            console.error('Error getting appointments by user id:', err);
            throw err;
        }
    }
}

module.exports = new AppointmentDataAccess();


// const mongoose = require('mongoose');
// const { User, Appointment } = require('../schema');
// const DataAccess = require('./dataAccess');

// class AppointmentDataAccess extends DataAccess {
//     async initialize() {
//         try {
//             await super.initialize(); // Call the superclass initialize method to establish the connection
//             this.collection = this.connection.collection('users'); // Access the 'users' collection
//             console.log('Connected to MongoDB and collection "users"');
//         } catch (error) {
//             console.error('Error initializing MongoDB:', error);
//             throw error; // Re-throw the error to handle it elsewhere
//         }
//     }

//     async create(data) {
//         try {
//             // Find the user by patientId and push the new appointment to their appointments array
//             const updatedUser = await User.findOneAndUpdate(
//                 { idNumber: data.patientId },
//                 {
//                     $push: {
//                         appointments: new Appointment({
//                             patientId: data.patientId,
//                             date: data.date,
//                             reason: data.reason
//                         })
//                     }
//                 },
//                 { new: true } // Return the updated user document
//             );

//             if (!updatedUser) {
//                 throw { name: "Create failed", message: "Error in creating appointment." };
//             }
//             return updatedUser.appointments.slice(-1)[0]; // Return the newly added appointment
//         } catch (err) {
//             console.error('Error adding appointment:', err);
//             throw err;
//         }
//     }

//     async delete(data) {
//         try {
//             const deletedAppointment = await User.findOneAndUpdate(
//                 { idNumber: data.patientId },
//                 { $pull: { appointments: { _id: data.appointmentId } } },
//                 { new: true }
//             );

//             if (!deletedAppointment) {
//                 throw { name: "Delete failed", message: "Error in deleting appointment." };
//             }
//             return deletedAppointment;
//         } catch (err) {
//             console.error('Error deleting appointment:', err);
//             throw err;
//         }
//     }

//     async update(data) {
//         try {
//             const updatedUser = await User.findOneAndUpdate(
//                 { idNumber: data.patientId, "appointments._id": data.appointmentId },
//                 {
//                     $set: {
//                         "appointments.$.date": data.date,
//                         "appointments.$.reason": data.reason
//                     }
//                 },
//                 { new: true }
//             );

//             if (!updatedUser) {
//                 throw { name: "Update failed", message: "Error in updating appointment." };
//             }

//             const updatedAppointment = updatedUser.appointments.find(appointment => appointment._id.toString() === data.appointmentId);
//             return updatedAppointment;
//         } catch (err) {
//             console.error('Error updating appointment:', err);
//             throw err;
//         }
//     }

//     async getById(id) {
//         try {
//             const user = await User.findOne({ idNumber: id });
//             if (user) {
//                 return user.appointments;
//             } else {
//                 throw { name: "User not found", message: "No user found with the given id." };
//             }
//         } catch (err) {
//             console.error('Error getting appointments by user id:', err);
//             throw err;
//         }
//     }
// }

// module.exports = new AppointmentDataAccess();
















// // const mongoose = require('mongoose');
// // const DataAccess = require('./dataAccess'); // Import using require syntax

// // class AppointmentDataAccess extends DataAccess {
// //     constructor() {
// //         super();
// //         mongoose.connect(process.env.MONGODB_URL, {
// //             useNewUrlParser: true,
// //             useUnifiedTopology: true
// //         })
// //             .then(async (connection) => {
// //                 this.connection = connection.db; // Store the database object
// //                 // Use the connection to get the specific collection:
// //                 this.collection = this.connection.collection('users');  // Replace 'users' with your actual collection name

// //                 console.log('Connected to MongoDB and collection "users"');

// //                 // Here you can add any collection-specific initialization you need
// //             })
// //             .catch(err => {
// //                 console.error('MongoDB connection error:', err);
// //                 throw err; // Re-throw the error to handle it elsewhere
// //             });
// //     }

// //     //params --- patientId, date,reason
// //     async create(data) {
// //         try {
// //             // Find the user by patientId and push the new inquiry to their inquiries array
// //             const updatedUser = await User.findOneAndUpdate(
// //                 { idNumber: data.patientId },
// //                 {
// //                     $push: {
// //                         appointments: new Appointment({
// //                             patientId: data.patientId,
// //                             date: data.date,
// //                             reason: data.reason
// //                         })
// //                     }
// //                 },
// //                 { new: true } // Return the updated user document
// //             );

// //             if (!updatedUser) {
// //                 throw { name: "Create failed", message: "Error in creating appointment." };
// //             }
// //             return updatedUser.inquiries.slice(-1)[0]; // Return the newly added inquiry
// //         } catch (err) {
// //             console.error('Error adding appointment:', err);
// //             throw err;
// //         }
// //     }

// //     //params --- patientId,appointmentId
// //     async delete(data) {
// //         try {
// //             const deletedAppointment = await User.findByIdAndDelete(
// //                 {
// //                     idNumber: data.patientId,
// //                     "appointments._id": data.appointmentId // Find the specific inquiry to update
// //                 },
// //             )

// //             if (!deletedAppointment) {
// //                 throw { name: "Delete failed", message: " Error in deleting appointment" };
// //             }
// //             return deletedAppointment;
// //         } catch (err) {
// //             console.error(err);
// //             throw err;
// //         }
// //     }
// //     //patientId, appointmentId, updateFields
// //     async update(data) {
// //         try {
// //             const updatedUser = await User.findOneAndUpdate(
// //                 {
// //                     idNumber: data.patientId,
// //                     "appointments._id": data.appointmentId
// //                 },
// //                 { $set: { "appointments.$": data.updateFields } },
// //                 { new: true }
// //             );

// //             if (!updatedUser) {
// //                 throw { name: "Update failed", message: "Error in updating appointment." };
// //             }

// //             const updatedAppointments = updatedUser.appointments.find(appointment => appointment._id.toString() === data.appointmentId);
// //             return updatedAppointments;
// //         } catch (err) {
// //             console.error(err);
// //             throw err;
// //         }
// //     }

// //     //params --- patientId,appointmentId
// //     async getById(id) {
// //         try {
// //             const appointmentUser = await User.findById(
// //                 {
// //                     idNumber: id,
// //                 },
// //             )
// //             return appointmentUser;
// //         } catch (err) {
// //             console.error(err);
// //             throw err;
// //         }
// //     }

// // }

// // module.exports = new AppointmentDataAccess();
