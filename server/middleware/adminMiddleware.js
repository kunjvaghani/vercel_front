// This middleware runs *after* the 'protect' middleware.
// It assumes that req.user has already been attached to the request.

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        // If the user exists and their role is 'admin', proceed
        next();
    } else {
        // Otherwise, send a 'Forbidden' error
        res.status(403).json({ message: 'Not authorized as an admin.' });
    }
};

module.exports = { isAdmin };
