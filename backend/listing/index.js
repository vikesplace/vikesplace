import express from "express";
import "dotenv/config";
import axiosConfig from "./config/axiosConfig.js";
import listing from "./routes/listing.js";
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(identification);
app.use(express.json());
app.use("/listings", listing);

function identification(req, res, next) {
  try {
    const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
    const decoded = jwt.verify(req.cookies.Authorization, jwtSecret);
    res.locals.decodedToken = decoded;
    next();
  } catch (err) {
    res.json({ message: err.message });
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
