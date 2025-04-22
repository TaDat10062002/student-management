import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectedRoute = async (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        if (!token) {
            return res.status(404).json({
                message: "Unauthorised - Token not found - You need to be login"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(400).json({
                message: "Unauthorised - Invalid Token"
            })
        }
        const userId = decoded.userId;
        const user = await User.findById(userId).select('-password');
        req.user = user;
        next();
    } catch (error) {
        console.log(`Error protectedRoute in authMiddleWare ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const requireAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== 'admin') {
            return res.status(403).json({
                message: "Unauthorised - You are not Admin!!!"
            })
        }
        next();
    } catch (error) {
        console.log(`Error requireAdmin in authMiddleWare ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const requireTeacherOrAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== 'admin' && user.role !== 'teacher') {
            return res.status(403).json({
                message: "Unauthorised - You must be Admin or Teacher!!!"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(`Error requireTeacherOrAdmin in authMiddleWare ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const requireAdminOrStudent = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== 'admin' && user.role !== 'student') {
            return res.status(403).json({
                message: "Unauthorised - You must be Admin or Student!!!"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(`Error requireTeacherOrAdmin in authMiddleWare ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const requireStudent = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== 'student') {
            return res.status(403).json({
                message: "You must be a student"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(`Error requireStudent in authMiddleWare ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}