const express = require('express');
const appointmentsController = require('../controllers/appointmentsControllers');
const router = express.Router();

router.use(express.json());

router.get('/', (req, res, next) => {
    appointmentsController.getAll(req, res, next);
});

router.post('/', (req, res, next) => {
    appointmentsController.create(req, res, next);
});

router.get('/:id', (req, res, next) => {
    appointmentsController.getById(req, res, next);
});

router.put('/:id', (req, res, next) => {
    appointmentsController.update(req, res, next);
});

router.delete('/:id', (req, res, next) => {
    appointmentsController.delete(req, res, next);
});

module.exports = router;
