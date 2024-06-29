// console.log('Loading inquiriesRouter.js');
// const express = require('express');
// const inquiriesController = require('../controllers/inquiriesControllers');
// const router = express.Router();
// // בתוך הראוטר או ה-middleware שלך
// // router.use((req, res, next) => {
// //     console.log('req:', req); // בדיקה אם req מוגדר
// //     console.log('res:', res); // בדיקה אם res מוגדר
// //     console.log('next:', next); // בדיקה אם next מוגדר
// //     // ... שאר הקוד שלך
// //   });
  
// router.use(express.json());

// router.get('/', (req, res, next) => {
//     console.log("router.get'/'");
//     inquiriesController.getAll(req, res, next);

// });

// router.post('/', (req, res, next) => {
//     inquiriesController.create(req, res, next);
// });

// router.get('/:id', (req, res, next) => {
//     inquiriesController.getById(req, res, next);
//     console.log("router.get'/:id'")
// });

// router.put('/:id', (req, res, next) => {
//     inquiriesController.update(req, res, next);
// });

// router.delete('/:id', (req, res, next) => {
//     inquiriesController.delete(req, res, next);
// });

// module.exports = router;

// inquiriesRouter.js
const express = require('express');
const router = express.Router();
const inquiriesController=require('../controllers/inquiriesControllers');


const {User} = require('../schema');

router.use(express.json());

// GET all inquiries for a specific patient


// router.post('/', (req, res, next) => {
//     inquiriesController.create(req, res, next);
// });
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


