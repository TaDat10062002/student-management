import express, { request } from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import departmentRoute from "./routes/department.route.js";
dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

// apply body json
app.use(express.json());

// apply routes
app.use("/api/departments/", departmentRoute);
app.listen(PORT, () => {
    connectDB(MONGODB_URI)
    console.log(`Server is running at http://localhost:${PORT}`)
})