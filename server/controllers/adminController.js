// const User = require('../models/User');
// const Scholarship = require('../models/Scholarship');


// exports.getDashboardStats = async (req, res) => {
//     try {
//         const totalUsers = await User.countDocuments();
//         const totalScholarships = await Scholarship.countDocuments();
//         // More stats can be added later (e.g., total applications)

//         res.status(200).json({
//             totalUsers,
//             totalScholarships
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error fetching stats.' });
//     }
// };


// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find({}).select('-password'); // Find all users, exclude password
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error fetching users.' });
//     }
// };


// exports.getAllApplications = async (req, res) => {
//     try {
//         // This is an advanced MongoDB query to get all applications
//         const usersWithApps = await User.find({ 'appliedScholarships.0': { $exists: true } })
//             .populate('appliedScholarships.scholarshipId')
//             .select('firstName lastName academics appliedScholarships');

//         // We flatten the data to make it easy for the frontend
//         const allApplications = usersWithApps.flatMap(user =>
//             user.appliedScholarships.map(app => ({
//                 applicationId: app._id,
//                 userId: user._id,
//                 userName: `${user.firstName} ${user.lastName}`,
//                 userAcademics: user.academics,
//                 scholarshipTitle: app.scholarshipId ? app.scholarshipId.title : 'Deleted Scholarship',
//                 status: app.status,
//                 appliedDate: app.appliedDate
//             }))
//         );
        
//         // Sort by most recent applications first
//         allApplications.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));

//         res.status(200).json(allApplications);
//     } catch (error) {
//         console.error("Error fetching all applications:", error);
//         res.status(500).json({ message: 'Server error fetching applications.' });
//     }
// };


// exports.updateApplicationStatus = async (req, res) => {
//     const { userId, applicationId, status } = req.body;

//     if (!['Applied', 'In Review', 'Awarded', 'Rejected'].includes(status)) {
//         return res.status(400).json({ message: 'Invalid status value.' });
//     }

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         const application = user.appliedScholarships.id(applicationId);
//         if (!application) {
//             return res.status(404).json({ message: 'Application not found.' });
//         }

//         application.status = status;
//         await user.save();

//         res.status(200).json({ message: `Application status updated to ${status}` });
//     } catch (error) {
//         console.error("Error updating status:", error);
//         res.status(500).json({ message: 'Server error updating status.' });
//     }
// };


// exports.getUserById = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id).select('-password');
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error fetching user.' });
//     }
// };

// 16-08-2025
const User = require('../models/User');
const Scholarship = require('../models/Scholarship');

// --- GET ALL USERS (More Robust) ---
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        // Add detailed logging
        console.error('ADMIN_GET_ALL_USERS_ERROR:', error);
        res.status(500).json({ message: 'Server error while fetching users.' });
    }
};

// --- GET ALL APPLICATIONS (Completely Rewritten for Safety) ---
exports.getAllApplications = async (req, res) => {
    try {
        // Find all users who have at least one application.
        const usersWithApps = await User.find({ 'appliedScholarships.0': { $exists: true } })
            .populate({
                path: 'appliedScholarships.scholarshipId',
                model: 'Scholarship',
                select: 'title' // Only populate the title field
            })
            .select('firstName lastName academics appliedScholarships');

        // This code now safely processes the data and handles cases where a scholarship might have been deleted.
        const allApplications = usersWithApps.flatMap(user =>
            user.appliedScholarships
                .filter(app => app.scholarshipId) // IMPORTANT: Only include apps where the scholarship still exists
                .map(app => ({
                    applicationId: app._id,
                    userId: user._id,
                    userName: `${user.firstName} ${user.lastName}`,
                    userAcademics: user.academics,
                    scholarshipTitle: app.scholarshipId.title,
                    status: app.status,
                    appliedDate: app.appliedDate
                }))
        );
        
        // Sort by the most recent applications first
        allApplications.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));

        res.status(200).json(allApplications);
    } catch (error) {
        // Add detailed logging
        console.error('ADMIN_GET_ALL_APPLICATIONS_ERROR:', error);
        res.status(500).json({ message: 'Server error while fetching applications.' });
    }
};

// --- UPDATE APPLICATION STATUS (Existing, but with better logging) ---
exports.updateApplicationStatus = async (req, res) => {
    const { userId, applicationId, status } = req.body;

    if (!['Applied', 'In Review', 'Awarded', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const application = user.appliedScholarships.id(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found.' });
        }

        application.status = status;
        await user.save();

        res.status(200).json({ message: `Application status updated to ${status}` });
    } catch (error) {
        // Add detailed logging
        console.error('ADMIN_UPDATE_STATUS_ERROR:', error);
        res.status(500).json({ message: 'Server error while updating status.' });
    }
};

// --- GET A SINGLE USER'S DETAILS (Existing, but with better logging) ---
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        // Add detailed logging
        console.error('ADMIN_GET_USER_BY_ID_ERROR:', error);
        res.status(500).json({ message: 'Server error while fetching user.' });
    }
};

// Note: The getDashboardStats function is simple and likely not the cause, so it can remain as is.
exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalScholarships = await Scholarship.countDocuments();
        res.status(200).json({ totalUsers, totalScholarships });
    } catch (error) {
        console.error('ADMIN_GET_STATS_ERROR:', error);
        res.status(500).json({ message: 'Server error fetching stats.' });
    }
};

