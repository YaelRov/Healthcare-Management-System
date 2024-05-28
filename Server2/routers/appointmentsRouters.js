import dotenv from 'dotenv';
import express from 'express';
import appointmentControllers from '../controllers/appointmentsControllers';
const router = express.Router();
router.use(express.json());

router.get('/', (req, res, next) => {
    appointmentControllers.getAll(req, res, next);
});

router.post('/', (req, res, next) => {
    appointmentControllers.create(req, res, next);
});


router.get('/:id', (req, res, next) => {
    appointmentControllers.getById(req, res, next)
});


router.put('/:id', (req, res, next) => {
    appointmentControllers.update(req, res, next)
});

router.delete('/:id', (req, res, next) => {
    appointmentControllers.delete(req, res, next)
});

export default router;