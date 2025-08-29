const express = require('express');
const router = express.Router();
const { getMe, getMyApplications  , applyToScholarship} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// This route will get the logged-in user's data
router.get('/me', protect, getMe);

// This route will get the scholarships a user has applied to
router.get('/my-applications', protect, getMyApplications);


router.post('/apply/:scholarshipId', protect, applyToScholarship);


module.exports = router;
