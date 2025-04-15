import { destroyToken, generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        // validate data
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        // check account existing
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Email has already exist!!!"
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        })

        generateToken(newUser._id, res);
        await newUser.save();
        return res.status(201).json({
            message: "Signed up successfully"
        })
    } catch (error) {
        console.log(`Error signup in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User credentials not found"
            })
        }

        // check password
        const isCorrectedPassword = bcrypt.compareSync(password, user.password);
        if (!isCorrectedPassword) {
            return res.status(400).json({
                message: "Wrong password!!!"
            })
        }

        generateToken(user._id, res);
        return res.status(200).json({
            message: "Login successfully",
            user
        })

    } catch (error) {

    }
}

export const logout = async (req, res) => {
    try {
        destroyToken(res);
        res.status(200).json({
            message: "Logged out successfully"
        })
    } catch (error) {

    }
}