const express = require('express');
const router = express.Router();

// Import controllers and middleware
const { getDashboardStats, getAllUsers  , getAllApplications,       // <-- Import new
    updateApplicationStatus,  // <-- Import new
    getUserById  } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');


router.use(protect, isAdmin);


// Define the admin routes
// Note: We apply both 'protect' and 'isAdmin' middleware.
// The request must pass both checks to proceed.
router.get('/stats', protect, isAdmin, getDashboardStats);
router.get('/users', protect, isAdmin, getAllUsers);
router.get('/users/:id', getUserById); // <-- Add new
router.get('/applications', getAllApplications); // <-- Add new
router.put('/application-status', updateApplicationStatus); // <-- Add new

module.exports = router;
