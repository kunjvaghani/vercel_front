const express = require('express');
const router = express.Router();
const multer = require('multer');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Set up multer for file storage. This will save files to a folder named 'uploads'.
// Make sure you create an 'uploads' folder in your server directory.
const upload = multer({ dest: 'uploads/' });

// Define the fields that will contain files.
const fileUploadFields = [
    { name: 'photo', maxCount: 1 },
    { name: 'aadhaarCard', maxCount: 1 },
    { name: 'incomeCertificate', maxCount: 1 },
    { name: 'casteCertificate', maxCount: 1 },
    { name: 'disabilityCertificate', maxCount: 1 },
    { name: 'previousYearResult', maxCount: 1 },
    { name: 'admissionProof', maxCount: 1 },
    { name: 'marksheet10th', maxCount: 1 },
    { name: 'marksheet12th', maxCount: 1 },
    { name: 'marksheetDiploma', maxCount: 1 } , 
    {name : 'Previous Year result', maxCount: 1},

];

// --- ROUTES ---

// Registration Route
router.post('/register', upload.fields(fileUploadFields), authController.register);

// --- NEW: Login Route ---
router.post('/login', authController.login);

// --- NEW: Get current user info ---
router.get('/user', auth, authController.getCurrentUser);

router.post('/update-password', authController.updatePassword);


module.exports = router;
