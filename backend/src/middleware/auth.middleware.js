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
    const token = req.cookies.jwt;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.userId;
        const user = await User.findById(userId);
        if (user.role !== 'Admin') {
            return res.status(400).json({
                message: "Unauthorised - You are not Admin!!!"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(`Error requireAdmin in authMiddleWare ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}