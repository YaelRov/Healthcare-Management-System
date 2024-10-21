const express = require('express');
const appointmentsController = require('../controllers/appointmentsControllers');
const router = express.Router();

router.use(express.json());


router.post('/:userId', (req, res, next) => {
    appointmentsController.create(req, res, next);
});


router.get('/:userId/:id', (req, res, next) => {
    appointmentsController.getByItemId(req, res, next);
});
router.get('/:userId', async (req, res, next) => {
    appointmentsController.getByUserId(req, res, next);
});

router.get('/', async (req, res, next) => {
    appointmentsController.getAll(req, res, next);
});

router.put('/:userId/:id', (req, res, next) => {
    appointmentsController.update(req, res, next);
});

router.delete('/:userId/:id', (req, res, next) => {
    appointmentsController.delete(req, res, next);
});

module.exports = router;
