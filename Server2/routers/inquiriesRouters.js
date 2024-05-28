import dotenv from 'dotenv';
import express from 'express';
import inquiryControllers from '../controllers/inquiriesControllers';
const router = express.Router();
router.use(express.json());

router.get('/', (req, res, next) => {
    inquiryControllers.getAll(req, res, next);
});

router.post('/', (req, res, next) => {
    inquiryControllers.create(req, res, next);
});


router.get('/:id', (req, res, next) => {
    inquiryControllers.getById(req, res, next)
});


router.put('/:id', (req, res, next) => {
    inquiryControllers.update(req, res, next)
});

router.delete('/:id', (req, res, next) => {
    inquiryControllers.delete(req, res, next)
});

export default router;