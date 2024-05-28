import Controller from "./controllers.js";
import appointmentsService from '../services/appointmentsServices.js'
class appointmentControllers extends Controller {
    constructor(Service) {
        super(Service);
    }
    
}

export default new appointmentControllers(appointmentsService);