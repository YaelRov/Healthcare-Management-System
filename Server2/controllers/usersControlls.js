import Controller from "./controllers.js";
import usersService from '../services/usersServices.js'
class userControllers extends Controller {
    constructor(Service) {
        super(Service);
    }
    
}

export default new userControllers(usersService);