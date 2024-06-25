import express from "express";
import messages from "./routes/messages.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "dotenv/config";

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use(cookieParser());
app.use(express.json());
app.use(identification);
app.use("/messages", messages);

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
