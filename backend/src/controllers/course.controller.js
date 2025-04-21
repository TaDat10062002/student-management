import Course from "../models/course.model.js";

export const createCourse = async (req, res) => {
    const { teacherID, subjectID, amount } = req.body;
    try {
        const course = await Course.find();
        if (!course) {
            const newCourse = new Course({
                course_code: "1000",
                teacherID: teacherID,
                subjectID: subjectID,
                amount: amount
            })
            console.log(newCourse);
        }
    } catch (error) {

    }
}