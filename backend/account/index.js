import express from "express";
import loginRouter from "./routes/login.js";
import registerRouter from "./routes/register.js";
import resetPassword from "./routes/request_reset.js";
import verifyPassword from "./routes/verify_reset.js";
import verifyAccountRouter from "./routes/verify_account.js";
import jwt from "jsonwebtoken";
import axiosConfig from "./config/axiosConfig.js";
import cors from "cors" 

const PORT = process.env.PORT || 5000;
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
const app = express();

// cution: middleware chain matches the route from top to buttom
app.use(cors({
  origin:["http://localhost:3000"],
  credentials:true
}));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
app.use(express.json());
app.use("/login", loginRouter);
app.use("/request_account", registerRouter);
app.use("/verify_account", identification, verifyAccountRouter);
app.use("/request_reset", resetPassword);
app.use("/verify_reset", identification, verifyPassword);

function identification(req, res, next) {
  const token = req.body.jwt;
  try {
    const decoded = jwt.verify(token, jwtSecret);
    res.locals.decodedToken = decoded;
    next();
  } catch (err) {
    res.json({message: err.message});
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
