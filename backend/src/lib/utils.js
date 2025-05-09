import jwt from "jsonwebtoken";
export const generateToken = async (userId, res) => {
    const times = 7 * 24 * 60 * 60 * 1000;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "7 days" });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: times,
    })
    return token;
}

export const destroyToken = (res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });
};

export const generateCourseCode = (course) => {
    if (!course) return "1000";
    return Number(course.code) + 1;
}
