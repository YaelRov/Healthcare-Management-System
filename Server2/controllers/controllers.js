// class controller {

//     constructor(service) {
//         this.service = service;
//     }

//     async create(req, res, next) {
//         const newData = req.body;
//         try {
//             const result = await this.service.create(newData);
//             if (result.insertId!=-1) {//כשמחזיר שגיאה
//                 res.status(200).send(`${result.insertId}`);

//             } else {
//                 res.status(404).send('failed to add');
//             }
//         } catch (error) {
//             res.status(500).send('Internal Server Error');
//         }

//     }

//     async getAll(req, res, next) {

//         try {

//             const result = await this.service.getAll();

//             if (result.hasError) {

//                 res.status(404).send('Error');

//             }

//             else {

//                 res.status(200).send(result.data);

//             }

//         } catch (error) {

//             res.status(500).send('Internal Server Error');

//         }

//     }

//     async getById(req, res, next) {

//         const id = req.params.id;

//     try {

//         const result = await this.service.getById(id);

//         if (result.hasError) {

//             res.status(404).send('Error');

//         }

//         else {

//             res.status(200).send(result.data);

//         }

//     } catch (error) {

//         res.status(500).send('Internal Server Error');

//     }

//     }

    

//     async update(req, res, next) {

//         const id = req.params.id;

//         const updatedData = req.body;

//         try {

//             const result = await this.service.update(updatedData);

//             if (result.affectedRows > 0) {

//                 res.status(200).send(`${id} updated successfully`);

//             } else {

//                 res.status(404).send(`${id} not found`);

//             }

//         } catch (error) {

//             res.status(500).send('Internal Server Error');

//         }

//     }

//     async delete(req, res, next) {

//         const id = req.params.id;

//         try {

//             console.log(id);

//             const result = await this.service.delete(id);

//             console.log(result);

//             if (result.affectedRows > 0) {

//                 res.status(200).send(`${id} deleted successfully`);

//             } else {

//                 res.status(404).send(`${id} not found`);

//             }

//         } catch (error) {

//             res.status(500).send('Internal Server Error');

//         }

//     }

// }

// export default controller;

// import controller from "./controller.js";

// import registeredCustomerdService from '../Services/registeredCustomers.service.js';

// class registerCustomersController extends controller {

//     constructor(service) {

//         super(service);

//     }

//     async getByEmail(req, res, next) {

//         const email = req.params.email;

//     try {

//         const result = await this.service.getByEmail(email);

//         if (result.hasError) {

//             res.status(404).send('Error');

//         }

//         else {

//             res.status(200).send(result.data);

//         }

//     } catch (error) {

//         res.status(500).send('Internal Server Error');

//     }

//     }

// }

// export default new registerCustomersController(registeredCustomerdService);

class Controller {
    constructor( service ) {
        this.service = service;
    }

    async getAll( req, res, next ) {
        try {
            const response = await this.service.getAll( req.query );
            return res.status( response.statusCode ).json( response );
        } catch ( e ) {
            next( e );
        }

    }

    async get( req, res, next ) {
        const { id } = req.params;
        try {
            const response = await this.service.get( id );
            return res.status( response.statusCode ).json( response );
        } catch ( e ) {
            next( e );
        }
    }

    async insert( req, res, next ) {
        try {

            const response = await this.service.insert( req.body );

            return res.status( response.statusCode ).json( response );

        } catch ( e ) {

            next( e );

        }

    }

    async update( req, res, next ) {

        const { id } = req.params;

        try {

            const response = await this.service.update( id, req.body );

            return res.status( response.statusCode ).json( response );

        } catch ( e ) {

            next( e );

        }

    }

    async delete( req, res, next ) {
        const { id } = req.params;
        try {
            const response = await this.service.delete( id );
            return res.status( response.statusCode ).json( response );
        } catch ( e ) {
            next( e );
        }

    }

}

module.exports = { Controller };
