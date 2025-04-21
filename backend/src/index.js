import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { connectDB } from "./lib/db.js";
import authRoute from "./routes/auth.route.js";
import departmentRoute from "./routes/department.route.js";
import subjectRoute from "./routes/subject.route.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";

dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

// apply body json
app.use(express.json());

// apply for cookies
app.use(cookieParser());

// apply routes
app.use("/api/auth/", authRoute);
app.use("/api/user/", userRoute);
app.use("/api/department/", departmentRoute);
app.use("/api/subject/", subjectRoute);
app.use("/api/course/", courseRoute);

app.listen(PORT, () => {
    connectDB(MONGODB_URI)
    console.log(`Server is running at http://localhost:${PORT}`)
})