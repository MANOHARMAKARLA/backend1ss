const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Middleware to verify admin role
const verifyAdmin = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (user && user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};

module.exports = { verifyToken, verifyAdmin };
