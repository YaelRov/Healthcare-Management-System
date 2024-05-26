const { Appointment } = require('../schema');

async function addAppointment(patientId, date,reason) {
    try {
        // Find the user by patientId and push the new inquiry to their inquiries array
        const updatedUser = await User.findOneAndUpdate(
            { idNumber: patientId },
            {
                $push:  {
                    appointments: new Appointment( {
                        patientId,
                        date,
                        reason
                    })
                }
            },
            { new: true } // Return the updated user document
        );

        if (!updatedUser) {
            throw new Error(`Error to add appointments`);
        }

        return updatedUser.inquiries.slice(-1)[0]; // Return the newly added inquiry
    } catch (err) {
        console.error('Error adding appointment:', err);
        throw err;
    }
}


async function deleteAppointment(patientId,appointmentId) {
    try {
        const deletedAppointment = await User.findByIdAndDelete(
            {
                idNumber: patientId,
                "appointments._id": appointmentId // Find the specific inquiry to update
            },
        )
   
        if (!deletedAppointment) {
            throw new Error(`Error delete appointmens`);
        }
        return deletedAppointment;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function updateAppointment(patientId, appointmentId, updateFields) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            {
                idNumber: patientId,
                "appointments._id": appointmentId
            },
            { $set: { "appointments.$": updateFields } },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error(`Error to delete appointments`);
        }

        const updatedAppointments = updatedUser.appointments.find(appointment => appointment._id.toString() === appointmentId);
        return updatedAppointments;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


async function readAppointment(patientId,appointmentId) {
    try {
        const appointmentUser = await User.findById(
            {
                idNumber: patientId,
                "appointments._id": appointmentId // Find the specific inquiry to update
            },
        )
        if (!appointmentUser) {
            throw new Error(`Error to reading appointments`);
        }
        return appointmentUser;
    } catch (err) {
        console.error(err);
        throw err;
    }
}



module.exports = {
    addAppointment,
    deleteAppointment,
    updateAppointment,
    readAppointment
};
