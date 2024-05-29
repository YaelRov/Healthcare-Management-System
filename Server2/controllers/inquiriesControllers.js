const Controller = require('./controllers.js');
const inquirysServices = require('../services/inquiriesServices.js');

class InquiryControllers extends Controller {
    constructor(Service) {
        super(Service);
    }
}

module.exports = new InquiryControllers(inquirysServices);
