const Controller = require('./controllers.js');
const appointmentsServices = require('../services/appointmentsServices.js');

class AppointmentControllers extends Controller {
    constructor(Service) {
        super(Service);
    }
    async create(req, res, next) {
        try {
            const id = req.params.userId;
            const result = appointmentsServices.create(id, req.body);
            res.status(201).send(result);
        } catch (err) {
            console.error(err);
            if (err.name === 'ValidationError') {
                res.status(400).send('Validation error: ' + err.message);
            } else if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409).send('Duplicate key error: ' + err.message);
            } else {
                res.status(500).send('Internal Server Error');
            }
        }
    }

    async getAll(req, res, next) {
        try {


            let result = await appointmentsServices.getAll();
            if (req.session.profile == 0) {
                result = result.flatMap(app => 
                    app.map(appointment => appointment.date)
                  );
                  console.log(result);
            }
          
                res.status(200).send(result);
            


        } catch (err) {
            console.log("error in appointments getAll")
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async getByUserId(req, res, next) {
        try {
            const id = req.params.userId;
            const result = await appointmentsServices.getByUserId(id);
            if (!result) {
                res.status(404).send('Not found');
            } else {
                res.status(200).send(result);
            }
        } catch (err) {
            console.error(err);
            if (err.kind === 'ObjectId') {
                res.status(400).send('Invalid ID');
            } else {
                console.log("error in controlers getById")
                res.status(500).send('Internal Server Error');
            }
        }
    }

    async getByItemId(req, res, next) {
        try {
            const userId = req.params.userId;
            const id = req.params.id;
            const result = await appointmentsServices.getByItemId(userId, id);
            if (!result) {
                res.status(404).send('Not found');
            } else {
                res.status(200).send(result);
            }
        } catch (err) {
            console.error(err);
            if (err.kind === 'ObjectId') {
                res.status(400).send('Invalid ID');
            } else {
                console.log("error in controlers getById")
                res.status(500).send('Internal Server Error');
            }
        }
    }
    async update(req, res, next) {
        try {
            const patientId = req.params.userId;
            const id = req.params.id;
            const result = await appointmentsServices.update(patientId, id, req.body);
            res.status(200).send(`${id} updated successfully`);
        } catch (err) {
            console.error(err);
            if (err.name === "Update failed") {
                res.status(404).send('Not found: ' + err.message);
            } else if (err.name === 'ValidationError') {
                res.status(400).send('Validation error: ' + err.message);
            } else {
                res.status(500).send('Internal Server Error');
            }
        }
    }

    async delete(req, res, next) {
        try {
            const userId = req.params.userId;
            const id = req.params.id;
            const result = await appointmentsServices.delete(userId, id);
            res.status(200).send(`${id} deleted successfully`);
        } catch (err) {
            console.error(err);
            if (err.name === "Delete failed") {
                res.status(404).send('Not found: ' + err.message);
            } else {
                res.status(500).send('Internal Server Error');
            }
        }
    }
}


module.exports = new AppointmentControllers(appointmentsServices);
