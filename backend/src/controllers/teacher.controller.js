import Teacher from "../models/teacher.model.js";

export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        if (teachers.length === 0) {
            return res.status(400).json({
                message: "No teachers found!!!"
            })
        }
        res.status(200).json({
            teachers
        })
    } catch (error) {
        console.log(`Error getAllTeachers in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getTeacherByDepartmentId = async (req, res) => {

}

export const createTeacher = async (req, res) => {
    const { name, age, gender, departmentID } = req.body;
    try {
        if (!name || !age || !gender || !departmentID) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const newTeacher = new Teacher({
            name,
            age,
            gender,
            departmentID
        })

        await newTeacher.save();

        res.status(201).json({
            message: "Teacher has been created successfully",
            newTeacher
        })
    } catch (error) {
        console.log(`Error createTeacher in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateStudentMark = async (req, res) => {
    const { studentId } = req.params;
    try {
        console.log(studentId)
    } catch (error) {

    }
}