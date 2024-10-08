import express from "express";
import charity from "./routes/charity.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import axiosConfig from "./config/axiosConfig.js";

const PORT = process.env.PORT || 5000;
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
const app = express();

app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
    }));
app.use(cookieParser());
app.use(express.json());
app.use(identification);
app.use("/charity", charity);

function identification(req, res, next) {
    try {
        const decoded = jwt.verify(req.cookies.Authorization, jwtSecret);
        res.locals.decodedToken = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});