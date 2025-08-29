const Scholarship = require('../models/Scholarship');

// --- Function to get all scholarships ---
exports.getAllScholarships = async (req, res) => {
    try {
        // Find all scholarships and sort them by the nearest deadline
        const scholarships = await Scholarship.find().sort({ applicationDeadline: 1 });
        res.status(200).json(scholarships);
    } catch (error) {
        console.error('Error fetching scholarships:', error);
        res.status(500).json({ message: 'Server error while fetching scholarships.' });
    }
};

// --- Function to get a single scholarship by its IDshtsj ---
exports.getScholarshipById = async (req, res) => {
    try {
        const scholarship = await Scholarship.findById(req.params.id);
        if (!scholarship) {
            return res.status(404).json({ message: 'Scholarship not found.' });
        }
        res.status(200).json(scholarship);
    } catch (error) {
        console.error('Error fetching scholarship by ID:', error);
        res.status(500).json({ message: 'Server error while fetching scholarship details.' });
    }
};

// --- Function to add a new scholarship (for admin purposes later) ---
// This is important for you to add the 15 scholarships initially.
exports.createScholarship = async (req, res) => {
    try {
        // In a real app, you'd have strong validation here.
        const newScholarship = new Scholarship(req.body);
        await newScholarship.save();
        res.status(201).json({ message: 'Scholarship created successfully!', scholarship: newScholarship });
    } catch (error) {
        console.error('Error creating scholarship:', error);
        res.status(500).json({ message: 'Server error while creating scholarship.' });
    }
};
