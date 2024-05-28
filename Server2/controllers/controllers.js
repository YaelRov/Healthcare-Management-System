class Controllers {
    constructor(service) {
        this.service = service;
    }
    async create(req, res, next) {
        const newData = req.body;
        try {
            const result_id = await this.service.create(newData);
            res.status(201).send(`${result_id}`)
        }

        catch (err) {
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
            const result = await this.service.getAll();
            res.status(200).send(result);
        } catch (error) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    async getById(req, res, next) {
        const id = req.params.id;
        try {
            const result = await this.service.getById(id);
            if (!result) {
                res.status(404).send('Not found');
            }
            else {
                res.status(200).send(result);
            }
        } catch (error) {
            console.error(err);
            if (err.kind === 'ObjectId') {
                res.status(400).send('Invalid'); // Send status 400 if the ID format is invalid
            } else {
                res.status(500).send('Internal Server Error'); // Send status 500 if there is a server error
            }
        }
    }
    async update(req, res, next) {
        const id = req.params.id;
        try {
            console.log(id);
            const result = await this.service.delete(id);
            console.log(result);
            res.status(200).send(`${id} update successfully`)

        } catch (err) {
            console.error(err);
            if (err.name === "Update failed")
                res.status(404).send('Not found' + err.message);
            else if (err.name === 'ValidationError') {
                res.status(400).send('Validation error: ' + err.message);
            } else
                res.status(500).send('Internal server Error');
        }

    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const result = await this.service.delete(id)
            console.log(result);
            res.status(200).send(`${id} delete successfully`);
        }
        catch (err) {
            console.error(err);
            if (err.name === "Delete failed")
                res.status(404).send('Not found' + err.message);
            else
                res.status(500).send('Internal server Error');
        }

    }
}


