
const express = require('express');
const router = express.Router();
const inquiriesController = require('../controllers/inquiriesControllers');


const { User } = require('../schema');

router.use(express.json());


router.post('/:userId', (req, res, next) => {
    inquiriesController.create(req, res, next);
});

router.get('/:userId/:id', (req, res, next) => {
    inquiriesController.getByItemId(req, res, next);
});
router.get('/:userId', async (req, res, next) => {
    inquiriesController.getByUserId(req, res, next);
});

router.get('/', async (req, res, next) => {
    inquiriesController.getAll(req, res, next);
});

router.put('/:userId/:id', (req, res, next) => {
    inquiriesController.update(req, res, next);
});

router.delete('/:userId/:id', (req, res, next) => {
    inquiriesController.delete(req, res, next);
});

module.exports = router;


