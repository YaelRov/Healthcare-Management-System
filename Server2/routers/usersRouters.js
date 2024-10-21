
const express = require('express');
const userControllers = require('../controllers/usersControllers');
const router = express.Router();

router.use(express.json());


router.get('/:userId', (req, res, next) => {
    userControllers.getProfile(req, res, next);
});
router.post('/', (req, res, next) => {
    userControllers.create(req, res, next);
});

router.put('/:userId', (req, res, next) => {
    console.log('Request reached router:', req.params.userId);
    userControllers.update(req, res, next);
});



module.exports = router;
