import service from "./services.js";
import appointmentAccess from "../dataAccess/appointmentsAccess.js";
class appointmentsServies extends service {
    constructor(dataAccess) {
        super(dataAccess);
    }

    //  const AppointmentSchema = new Schema({
    //     _id: { type: Schema.Types.ObjectId, auto: true },
    //     patientId:{type: Number, required: true},
    //     date: { type: Date, required: true },
    //     reason: { type: String, required: true }
    //   });
    async create(data) {
        try {
            // 1. Validate appoiment data (add more specific validation as needed)
            if (data.patientId || !data.date || !data.reason) {
                throw new Error('Missing required fields');
            }
            const createAppointment = await this.dataAccess.create(data);
            return createAppointment;
        } catch (err) {
            // 4. Handle errors
            console.error('Error creating appointment:', err);
            throw new Error('Failed to create appointment');
        }
    }
    async update(data) {
        try {
            // 1. Validate updated fields
            if (!data.patientId || data.date || !data.reason) {
                throw new Error('missing answerText ');
            }
            // 2. Check authorization (ensure the user has permission to update)
            // ... (add your authorization logic here)
            // 3. Update user in database
            const updatedAppointment = await this.dataAccess.update(data); // Update based on ID
            return updatedAppointment;
        } catch (err) {
            //             // 4. Handle errors
            console.error('Error  updated appointment:', err);
            throw new Error('Failed to update inquiry');
        }
    }
    async getById(userId) {
        try {
            // 1. Get user from database
            const appointment = await this.dataAccess.getById(userId);
            return appointment;
        } catch (err) {
            // 2. Handle errors
            console.error('Error getting appoiment:', err);
            throw new Error('Failed to get appoiment');
        }
    }

    async delete(data) {
        try {
            // 1. Delete inquiry from database
            const deletedAppoiment = await this.dataAccess.delete(data.patientId);
            return deletedAppoiment;
        } catch (err) {
            // 2. Handle errors
            console.error('Error deleting appoiment:', err);
            throw new Error('Failed to delete appoiment');
        }
    }
}


export default new appointmentsServies(appointmentAccess);


