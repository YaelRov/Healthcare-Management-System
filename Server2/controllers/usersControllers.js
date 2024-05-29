const Controller = require('./controllers.js');
const usersService = require('../services/usersServices.js');

module.exports = new Controller(usersService);
