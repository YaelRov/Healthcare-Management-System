const dotenv = require('dotenv');
const express = require('express');
const userControllers = require('../controllers/usersControllers');
const router = express.Router();

router.use(express.json());

router.get('/', (req, res, next) => {
    userControllers.getAll(req, res, next);
});

router.post('/', (req, res, next) => {
    userControllers.create(req, res, next);
});

router.get('/:id', (req, res, next) => {
    userControllers.getById(req, res, next);
});

router.put('/:id', (req, res, next) => {
    userControllers.update(req, res, next);
});

router.delete('/:id', (req, res, next) => {
    userControllers.delete(req, res, next);
});

module.exports = router;
