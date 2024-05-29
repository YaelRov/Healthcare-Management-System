const Service = require("./services.js");
const appointmentAccess = require("../dataAccess/appointmentsAccess.js");

class AppointmentsService extends Service {
    constructor(dataAccess) {
        super(dataAccess);
    }

    async create(data) {
        try {
            // Validate appointment data
            if (!data.patientId || !data.date || !data.reason) {
                throw new Error('Missing required fields');
            }

            // Create appointment in database
            const createdAppointment = await this.dataAccess.create(data);
            return createdAppointment;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }

    async update(data) {
        try {
            // Validate updated fields
            if (!data.patientId || !data.date || !data.reason) {
                throw new Error('Missing required fields');
            }

            // Check authorization
            // Implement authorization logic here

            // Update appointment in database
            const updatedAppointment = await this.dataAccess.update(data);
            return updatedAppointment;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }

    async getById(userId) {
        try {
            // Get appointment by user ID from database
            const appointment = await this.dataAccess.getById(userId);
            return appointment;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }

    async delete(data) {
        try {
            // Delete appointment from database
            const deletedAppointment = await this.dataAccess.delete(data.patientId);
            return deletedAppointment;
        } catch (err) {
            // Handle errors
            throw err;
        }
    }
}

module.exports = new AppointmentsService(appointmentAccess);
