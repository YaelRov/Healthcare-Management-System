class Controllers {
    constructor(service) {
        this.service = service;
    }
    async create(req, res, next) {
        const newData = req.body;
        try {
            const result = await this.service.create(newData);
            if (result.insertId!=-1)
            {
                res.status(200).send(`${result.idNumber}`)
            }
            else {
                res.status(404).send('failed to add')
            }
        }
        catch (error) {
            res.status(500).send('Internal server Error');
        }
    }
    async getAll(req, res, next) {
        try {
            const result = await this.service.getAll();
            if (result.haveError) {
                res.status(404).send('Error');
            }
            else {
                res.status(200).send(result.data)
            }
        } catch (error) {
            res.status(500).send('Internal server Error')
        }
    }
    async getById(req, res, next) {
        const id = req.params.id;
        try {
            const result = await this.service.getAll();
            if (result.haveError) {
                res.status(404).send('Error');
            }
            else {
                res.status(200).send(result.data);
            }
        } catch (error) {
            res.status(500).send('Internal server Error');
        }
    }
    async update(req, res, next) {
        const id = req.params.id;
        try {
            console.log(id);
            const result = await this.service.delete(id);
            console.log(result);
            if (result.affectedRows > 0) {
                res.status(200).send(`${id} update successfully`)
            }
            else {
                res.status(404).send(`${id} not found`)
            }

        } catch (error) {
            res.status(500).send('Internal server Error');
        }

    }
    async delete(req, res, next) {
        const id = req.params.id;
        const result = await this.service.delete(id)
        console.log(result);
        if (result.affectedRows > 0) {
            res.status(200).send(`${id} delete successfully`);
        }
        else {
            res.status(404).send(`${id} not found`)
        }
    } catch(error) {
        res.status(500).send('Internal server Error');
    }

}


