import express from "express";
import search from "./routes/search.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";

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
app.use("/search", search);

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