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
                            patientId: data.patientId,
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

    async delete(userId, id) {
        try {
            const deletedAppointment = await User.findOneAndUpdate(
                { idNumber: userId },
                { $pull: { appointments: { _id: id } } },
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

    async getByUserId(id) {
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
    async getAll() {
        try {
            // Find all patients (users with role "patient")
            const patients = await User.find({ profile: 0 }).exec(); // Changed to use "profile" instead of "role"

            // Extract appointments from each patient
            const allAppointments = patients.flatMap(patient => patient.appointments); // Assuming patient.inquiries is an array

            return allAppointments;
        } catch (err) {
            throw err; // Rethrow the error to be handled by the controller
        }
    }
    async getByItemId(patientId, appointmentId) {
        try {
            const user = await User.findOne({ idNumber: patientId }); // Use idNumber
            if (user) {
                const appointment = user.appointments.find(appointment => appointment._id.toString() === appointmentId);
                if (!appointment) {
                    throw new Error(`Appointment with ID ${appointmentId} not found for patient ${patientId}`);
                }
                return appointment;
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

