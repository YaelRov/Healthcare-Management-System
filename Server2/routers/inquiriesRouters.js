const express = require('express');
const inquiriesController = require('../controllers/inquiriesControllers');
const router = express.Router();

router.use(express.json());

router.get('/', (req, res, next) => {
    inquiriesController.getAll(req, res, next);
});

router.post('/', (req, res, next) => {
    inquiriesController.create(req, res, next);
});

router.get('/:id', (req, res, next) => {
    inquiriesController.getById(req, res, next);
});

router.put('/:id', (req, res, next) => {
    inquiriesController.update(req, res, next);
});

router.delete('/:id', (req, res, next) => {
    inquiriesController.delete(req, res, next);
});

module.exports = router;
