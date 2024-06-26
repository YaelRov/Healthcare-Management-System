const express = require('express');
const loginControllers = require('../controllers/loginControllers');
const router = express.Router();

router.get('/:userId', (req, res, next) => {
    loginControllers.getPsw(req, res, next);
});

router.post('/:userId', (req, res, next) => {
    loginControllers.getByUserId(req, res, next);
});

module.exports = router;
