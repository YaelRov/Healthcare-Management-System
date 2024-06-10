const loginService = require('../services/loginService');

class loginControllers {
    async getPsw(req, res, next) {
        try {
            const id = req.params.userId;
            const result = await loginService.getPsw(id);
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
        catch (err) {
        }

    async getByUserId(req, res, next) {
        try {
            const id = req.params.userId;
            const result = await loginService.getByUserId(id);
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
}

module.exports = new loginControllers(loginService);