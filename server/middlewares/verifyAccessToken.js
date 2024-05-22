import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Admin from '../models/admin.model.js';

export const verifyAccessToken = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        req.user = decoded
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export const fetchUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).select('-password'); // Exclude the password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user; // Attach user object to request object
        next();
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export const verifyAdminAccessToken = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized Access!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET);
        req.adminId = decoded.adminId;
        req.admin = decoded
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export const fetchAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.adminId).select('-password'); // Exclude the password
        if (!admin) {
            return res.status(404).json({ message: 'Unauthozired Acccess!' });
        }
        req.admin = admin; // Attach user object to request object
        next();
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};