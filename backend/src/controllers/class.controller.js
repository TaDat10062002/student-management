import ClassRoom from "../models/class.model.js";
import Student from "../models/student.model.js";

export const getClass = async (req, res) => {
    const search = req.query.search || '';
    const page = req.query.page || 1;
    const item_per_page = req.query.item_per_page || 5;
    try {
        const queryClassRooms = ClassRoom.find();
        const totalDocs = (await queryClassRooms).length;
        const totalPages = Math.ceil(totalDocs / item_per_page);
        const classrooms = await queryClassRooms.clone().skip((page - 1) * item_per_page).limit(item_per_page);

        if (search) {
            const queryClassRooms = ClassRoom.find({
                name: {
                    $regex: search, $options: "i"
                }
            });
            const totalDocs = (await queryClassRooms).length;
            const totalPages = Math.ceil(totalDocs / item_per_page);
            const classrooms = await queryClassRooms.clone().skip((page - 1) * item_per_page).limit(item_per_page);

            return res.status(200).json({
                classrooms,
                pagination: {
                    currentPage: Number(page),
                    totalPages: totalPages,
                    item_per_page: item_per_page,
                    totalClasses: classrooms.length
                }
            })
        }

        if (page > totalDocs) {
            return res.status(404).json({
                message: "Page not found!!!"
            })
        }

        return res.status(200).json({
            classrooms,
            pagination: {
                currentPage: Number(page),
                totalPages: totalPages,
                item_per_page: item_per_page,
                totalClasses: classrooms.length
            }
        })

    } catch (error) {
        console.log(`Error getClass in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getStudentByClass = async (req, res) => {
    const { id: classID } = req.params;
    const search = req.query.search || '';
    const page = req.query.page || 1;
    const item_per_page = req.query.item_per_page || 5;
    const classroom = await ClassRoom.findById(classID).select("name -_id");
    try {
        if (search) {
            const queryStudentByClass = Student.find(
                {
                    role: 'student',
                    class: classID,
                    $or: [
                        {
                            fullName: { $regex: search, $options: "i" }
                        },
                        {
                            email: { $regex: search, $options: "i" }
                        }
                    ]
                });
            const students = await queryStudentByClass.clone().select("fullName email dob gender").populate({
                path: "class",
                select: "name -_id"
            }).skip((page - 1) * item_per_page).limit(item_per_page);
            const totalDocs = (await queryStudentByClass).length;
            const totalPages = Math.ceil(totalDocs / item_per_page);
            return res.status(200).json({
                students,
                classroom,
                pagination: {
                    currentPage: Number(page),
                    totalPages: totalPages,
                    item_per_page: item_per_page,
                    totalStudent: students.length
                }
            })
        }

        const queryStudentByClass = Student.find({ class: classID });
        const students = await queryStudentByClass.clone().select("fullName email dob gender").populate({
            path: "class",
            select: "name -_id"
        }).skip((page - 1) * item_per_page).limit(item_per_page);
        const totalDocs = (await queryStudentByClass).length;
        const totalPages = Math.ceil(totalDocs / item_per_page);
        return res.status(200).json({
            students,
            classroom,
            pagination: {
                currentPage: Number(page),
                totalPages: totalPages,
                item_per_page: item_per_page,
                totalStudent: students.length
            }
        })
    } catch (error) {
        console.log(`Error getStudentByClass ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const createClass = async (req, res) => {
    const { name } = req.body;
    try {
        const classRoom = await ClassRoom.findOne({ name: name });
        if (classRoom) {
            return res.status(400).json({
                message: "Class already exists"
            })
        }

        const newClassRoom = new ClassRoom({
            name
        });

        await newClassRoom.save();
        return res.status(201).json({
            message: "Created class successfully",
            newClassRoom
        })
    } catch (error) {
        console.log(`Error createClass in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}