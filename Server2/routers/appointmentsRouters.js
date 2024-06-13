const express = require('express');
const appointmentsController = require('../controllers/appointmentsControllers');
const router = express.Router();

router.use(express.json());



// router.post('/', (req, res, next) => {
//     appointmentsController.create(req, res, next);
// });
router.post('/:patientId', (req, res, next) => {
    appointmentsController.create(req, res, next);
});


router.get('/:patientId/:id', (req, res, next) => {
    appointmentsController.getByItemId(req, res, next);
});
router.get('/:patientId', async (req, res, next) => {
    appointmentsController.getByUserId(req, res, next);
});

router.get('/', async (req, res, next) => {
    appointmentsController.getAll(req, res, next);
});

router.put('/:patientId/:id', (req, res, next) => {
    appointmentsController.update(req, res, next);
});

router.delete('/:patientId/:id', (req, res, next) => {
    appointmentsController.delete(req, res, next);
});

module.exports = router;
