const { Appointment } = require('../schema');
const { default: dataAccess } = require('./dataAccess');
class appointmentDataAccess extends dataAccess {
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
    //params --- patientId, date,reason
async create(data) {
    try {
        // Find the user by patientId and push the new inquiry to their inquiries array
        const updatedUser = await User.findOneAndUpdate(
            { idNumber: data.patientId },
            {
                $push:  {
                    appointments: new Appointment( {
                        patientId: data.patientId,
                        date: data.date,
                        reason: data.reason
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

//params --- patientId,appointmentId
async delete(data) {
    try {
        const deletedAppointment = await User.findByIdAndDelete(
            {
                idNumber: data.patientId,
                "appointments._id": data.appointmentId // Find the specific inquiry to update
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
//patientId, appointmentId, updateFields
async update(data) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            {
                idNumber: data.patientId,
                "appointments._id": data.appointmentId
            },
            { $set: { "appointments.$": data.updateFields } },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error(`Error to delete appointments`);
        }

        const updatedAppointments = updatedUser.appointments.find(appointment => appointment._id.toString() === data.appointmentId);
        return updatedAppointments;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

//params --- patientId,appointmentId
async getById(id) {
    try {
        const appointmentUser = await User.findById(
            {
                idNumber: id,
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

}
export default new appointmentDataAccess();

// module.exports = {
//     addAppointment,
//     deleteAppointment,
//     updateAppointment,
//     readAppointment
// };
