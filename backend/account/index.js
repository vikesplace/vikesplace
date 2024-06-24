import express from "express";
import loginRouter from "./routes/login.js";
import registerRouter from "./routes/register.js";
import passwordRouter from "./routes/password.js";
import verifyAccountRouter from "./routes/verify_account.js";
import jwt from "jsonwebtoken";
import axiosConfig from './config/axiosConfig.js';

const PORT = process.env.PORT || 5000;
const app = express();

// cution: middleware chain matches the route from top to buttom

app.get("/", (req, res) => {
  res.json({ message: "Hello Worldfdg" });
});
app.use(express.json());
app.use("/login", loginRouter);
app.use("/request_account", registerRouter);
app.use("/verify_account", identification, verifyAccountRouter);
app.use("/password", passwordRouter);

function identification(req, res, next) {
  const token = req.body.jwt;
  const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
  const decoded = jwt.verify(token, jwtSecret);
  res.locals.decodedToken = decoded;
  next();
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
