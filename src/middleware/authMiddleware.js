const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Protect route for authenticated users
const protect = async (req, res, next) => {
    let token;

    // Check if token is in headers (Authorization: Bearer <token>)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token (excluding password)
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Proceed to the next middleware/route
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If there's no token
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Admin route for admin users only
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // If user is admin, allow the action
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' }); // Forbidden if not an admin
    }
};

module.exports = { protect, admin };