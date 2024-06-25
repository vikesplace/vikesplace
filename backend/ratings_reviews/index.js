import express from "express";
import review from "./routes/review.js";
import rating from "./routes/rating.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "dotenv/config";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(identification);
app.use("/review", review);
app.use("/rating", rating);

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
