const Controller = require('./controllers.js');
const appointmentsService = require('../services/appointmentsServices.js');

class AppointmentControllers extends Controller {
    constructor(Service) {
        super(Service);
    }
}

module.exports = new AppointmentControllers(appointmentsService);
