console.log('Loading inquiriesController.js');
// const Controller = require('./controllers.js');
const inquiriesServices = require('../services/inquiriesServices.js');

class InquiryControllers{// extends Controller {
//     constructor(Service) {
//         super(Service);
//         console.log(Service)
//     }
    async create(req, res, next) {
        try {
            const userId = req.params.patientId; 
            const newData = {
                patientId: userId, 
                inquiryText:req.body.inquiryText,
                files:req.body.files||null,
              };
            const result = await inquiriesServices.create(newData);
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
            if (!req.session.profile  !== 1) { // Check for profile 1 (doctor)
                return res.status(403).send('Forbidden - Only doctors can access all inquiries');
              }
            const result = await inquiriesServices.getAll();
            res.status(200).send(result);
        } catch (err) {
            console.log("error in controlers getAll")
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async getByUserId(req, res, next) {
        try {
            const id = req.params.patientId;
            const result = await inquiriesServices.getByUserId(id);
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

    async getByItemId(req, res,next)
    {
        try {
            const userId = req.params.patientId;
            const id=req.params.id;
            const result = await inquiriesServices.getByItemId(userId,id);
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
            const patientId = req.params.patientId; 
            const id = req.params.id;
            const updatedData = {
                file: req.body.file ,
                answerText:req.body.answerText,
                patientId: patientId,
                inquiryId: id
              };
              const result = await inquiriesServices.update(updatedData);
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
            const id = req.params.id;
            const userId=req.params.patientId
            const result = await inquiriesServices.delete(userId,id);
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

module.exports = new InquiryControllers(inquiriesServices);

