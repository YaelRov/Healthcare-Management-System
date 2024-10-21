const Service = require("./services.js");
const appointmentAccess = require("../dataAccess/appointmentsAccess.js");

class AppointmentsService {//extends Service {
    // constructor(dataAccess) {
    //     super(dataAccess);
    // }

    async create(id, data) {
        try {
            const newData = {
                ...data,
                patientId: id
            }
            //אולי לבדוק אם התאריך לא עבר
            // Validate appointment data
            if (!data.date) {
                throw new Error('Missing required fields');
            }

            // Create appointment in database
            const createdAppointment = await appointmentAccess.create(newData);
            return createdAppointment;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }

    async update(patientId, id, data) {
        try {
            const existingAppointment = await appointmentAccess.getByItemId(patientId, id);
            const updatedData = {
                appointmentId: id,
                patientId: patientId,
                reason: data.reason || existingAppointment.reason,
                date: data.date || existingAppointment.date
            };
            // Validate updated fields

            // Check authorization
            // Implement authorization logic here

            // Update appointment in database
            const updatedAppointment = await appointmentAccess.update(updatedData);
            return updatedAppointment;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }



    async delete(userId, id) {
        try {
            // Delete appointment from database
            const deletedAppointment = await appointmentAccess.delete(userId, id);
            return deletedAppointment;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }
    async getByUserId(userId) {
        try {
            // Get appointments by user ID from database
            const appointments = await appointmentAccess.getByUserId(userId);
            return appointments;
        } catch (err) {
            // Handle errors
            console.log("error in appointmentsServices getById")
            throw err;
        }
    }
    async getAll() { // New getAll function
        try {
            const allAppointments = await appointmentAccess.getAll();
            return allAppointments;
        } catch (err) {
            console.log("error in appointmentsServices getAll");
            throw err;
        }
    }
    async getByItemId(userId, id) {
        try {
            // Get appointments by user ID from database
            const appointments = await appointmentAccess.getByItemId(userId, id);
            return appointments;
        } catch (err) {
            // Handle errors
            console.log("error in appointmentServices getById")
            throw err;
        }
    }

}

module.exports = new AppointmentsService(appointmentAccess);
