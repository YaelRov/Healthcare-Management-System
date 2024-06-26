// const Controller = require('./controllers.js');
const usersService = require('../services/usersServices.js');

class userControllers {
    // async getAll(req, res, next) {
    //     try {
    //         const result = await usersService.getAll();
    //         res.status(200).send(result);
    //     } catch (err) {
    //         console.log("error in controlers getAll")
    //         console.error(err);
    //         res.status(500).send('Internal Server Error');
    //     }
    // }
    // async getByUserId(req, res, next) {
    //     try {
    //         const id = req.params.userId;
    //         const result = await usersService.getByUserId(id);
    //         if (!result) {
    //             res.status(404).send('Not found');
    //         } else {
    //             res.status(200).send(result);
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         if (err.kind === 'ObjectId') {
    //             res.status(400).send('Invalid ID');
    //         } else {
    //             console.log("error in controlers getById")
    //             res.status(500).send('Internal Server Error');
    //         }
    //     }
    // }

    async update(req, res, next) {
        console.log('Request reached controller:', req.params.id, req.body);
        try {
console.log(`email=${req.body.email} phoneNumber=${req.body.phoneNumber}
    city=${ req.body.address.city} street=${req.body.address.street} number=${req.body.address.number}`)
            const id = req.params.id;
            const updatedData = {
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                address: {
                    city: req.body.address.city,
                    street: req.body.address.street,
                    number: req.body.address.number
                }
            };
              const result = await usersService.update(id,updatedData);
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

    async getProfile(req, res, next) {
        const id = req.params.id;
        const result = await usersService.getProfile(id);
        if (!result) {
            res.status(404).send('Not found');
        } else {
           return result;
        }
    } catch(err) {
        console.error(err);
        if (err.kind === 'ObjectId') {
            res.status(400).send('Invalid ID');
        } else {
            console.log("error in controlers getById")
            res.status(500).send('Internal Server Error');
        }
    }




    async delete(req, res, next) {
        try {
            const patientId = req.params.userId; // Use req.params.patientId to get the id
            const result = await usersService.delete(patientId);
            res.status(200).send(`${patientId} deleted successfully`); // Use patientId in the response
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
module.exports = new userControllers(usersService);