import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { destroyToken, generateToken } from '../lib/utils.js'
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "No credentials found!!! Please try again"
            })
        }

        // check password 
        const isCorrectedPassword = bcrypt.compareSync(password, user.password);
        if (!isCorrectedPassword) {
            return res.status(400).json({
                message: "Wrong password!!!"
            })
        }

        const loggedUser = await User.findOne({ email }).select('-password');
        generateToken(user._id, res);
        res.status(200).json({
            message: `Logged in successfully with ${user.role} role`,
            loggedUser
        })
    } catch (error) {
        console.log(`Error login in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const logout = async (req, res) => {
    try {
        destroyToken(res);
        return res.status(200).json({
            message: "Logged out successfully"
        })
    } catch (error) {
        console.log(`Error logout in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}