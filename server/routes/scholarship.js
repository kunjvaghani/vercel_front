const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/ScholarshipController');

// --- GET all scholarships ---
// This will be available at: /api/scholarships
router.get('/', scholarshipController.getAllScholarships);

// --- GET a single scholarship by its ID ---
// This will be available at: /api/scholarships/some-id-from-database
router.get('/:id', scholarshipController.getScholarshipById);

// --- POST a new scholarship (for adding your data) ---
// This will be available at: /api/scholarships
router.post('/', scholarshipController.createScholarship);

module.exports = router;
