import express, { request } from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { connectDB } from "./lib/db.js";
import authRoute from "./routes/auth.route.js";
import adminRoute from "./routes/admin.route.js";
import departmentRoute from './routes/department.route.js';

dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

// apply body json
app.use(express.json());

// apply for cookies
app.use(cookieParser());

// apply routes
app.use("/api/admin/", adminRoute);
app.use("/api/auth/", authRoute);
app.use("/api/department/", departmentRoute);

app.listen(PORT, () => {
    connectDB(MONGODB_URI)
    console.log(`Server is running at http://localhost:${PORT}`)
})