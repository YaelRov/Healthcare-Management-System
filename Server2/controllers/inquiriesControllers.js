console.log('Loading inquiriesController.js');
const Controller = require('./controllers.js');
const inquirysServices = require('../services/inquiriesServices.js');

class InquiryControllers extends Controller {
    constructor(Service) {
        super(Service);
        console.log(Service)
    }
}

module.exports = new InquiryControllers(inquirysServices);

