import jwt from "jsonwebtoken";
export const generateToken = async (userId, res) => {
    const times = 7 * 24 * 60 * 60 * 1000;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "7 days" });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        maxAge: times,
        sameSite: "strict"
    })
    return token;
}

export const destroyToken = async (res) => {
    const times = 0;
    res.cookie("jwt", "", {
        maxAge: times
    });
}

export const generateCourseCode = (course) => {
    if (!course) return "1000";
    return Number(course.course_code) + 1;
}

export const paginate = async (Model) => {

}