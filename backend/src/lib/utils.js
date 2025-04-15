import jwt from "jsonwebtoken";
export const generateToken = async (userId, res) => {
    const times = 7 * 24 * 60 * 60 * 1000;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "7 days" });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Chỉ áp dụng HTTPS trong môi trường production
        maxAge: times, // 1 giờ tính bằng mili-giây
        sameSite: 'strict' // Ngăn chặn các request từ các website khác
    })

    return token;
}

export const destroyToken = async (res) => {
    const times = 0;
    res.cookie("jwt", "", {
        maxAge: times
    });
}