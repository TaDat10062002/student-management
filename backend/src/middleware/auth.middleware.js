import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(400).json({
                message: "Unauthorised - Token not found"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decoded) {
            return res.status(400).json({
                message: "Unauthorise - Invalid token"
            })
        }

        const userId = decoded.userId;
        const user = await User.findById(userId);
        req.user = user;
        next();
    } catch (error) {

    }
}

export const requireAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(400).json({
                message: "Unauthorised - Token not found"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decoded) {
            return res.status(400).json({
                message: "Unauthorise - Invalid token"
            })
        }

        const userId = decoded.userId;
        const user = await User.findById(userId);
        if (Number(user.role) !== 1) {
            return res.status(400).json({
                message: "You are not admin"
            })
        }
        req.user = user;
        next();
    } catch (error) {

    }
}

export const isTeacher = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(400).json({
                message: "Unauthorised - Token not found"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decoded) {
            return res.status(400).json({
                message: "Unauthorise - Invalid token"
            })
        }

        const userId = decoded.userId;
        const user = await User.findById(userId);
        if (!user.teacher) {
            return res.status(400).json({
                message: "You are not a teacher"
            })
        }
        req.user = user;
        next();
    } catch (error) {

    }
}