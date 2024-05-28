import Controller from "./controllers.js";
import inquirysServices from '../services/inquiriesServices.js'
class inquiryControllers extends Controller {
    constructor(Service) {
        super(Service);
    }
    
}

export default new inquiryControllers(inquirysServices);