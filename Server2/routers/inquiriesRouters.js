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
const inquiriesController = require('../controllers/inquiriesControllers');
const {User} = require('../schema');

router.use(express.json());

// GET all inquiries for a specific patient
router.get('/:patientId', async (req, res, next) => {
    try {
        const patientId = parseInt(req.params.patientId); 
        const user = await User.findOne({ idNumber: patientId });
        if (!user) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const inquiries = user.inquiries;
        res.json(inquiries);
    } catch (error) {
        console.error("Error retrieving inquiries:", error);
        res.status(500).json({ error: "Failed to retrieve inquiries" });
    }
});


// POST a new inquiry for a specific patient
router.post('/:patientId', async (req, res, next) => {
    try {
        const patientId = parseInt(req.params.patientId);
        const newInquiry = req.body;

        // Find the user by patientId
        const user = await User.findOne({ idNumber: patientId });
        if (!user) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Push the new inquiry to the user's inquiries array
        user.inquiries.push(newInquiry);
        await user.save();
        res.status(201).json(newInquiry);
    } catch (error) {
        console.error("Error creating inquiry:", error);
        res.status(500).json({ error: "Failed to create inquiry" });
    }
});

router.get('/:patientId/:id', (req, res, next) => {
    inquiriesController.getById(req, res, next);
});

router.put('/:patientId/:id', (req, res, next) => {
    inquiriesController.update(req, res, next);
});

router.delete('/:patientId/:id', (req, res, next) => {
    inquiriesController.delete(req, res, next);
});

module.exports = router;


