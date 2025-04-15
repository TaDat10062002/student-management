import Teacher from "../models/teacher.model.js";
import User from "../models/user.model.js";

export const specificRoleUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const newTeacher = new Teacher({})
        await newTeacher.save();
        const updatedUser = await User.findByIdAndUpdate(userId, {
            teacher: newTeacher._id
        }, { new: true })
        res.status(200).json({
            message: `Update account to teacher role successfully`,
            updatedUser
        })
    } catch (error) {

    }
}