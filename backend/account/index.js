import express from "express";
import loginRouter from "./routes/login.js";
import registerRouter from "./routes/register.js";
import passwordRouter from "./routes/password.js";
import axiosConfig from './config/axiosConfig.js';

const PORT = process.env.PORT || 5000;
const app = express();

// cution: middleware chain matches the route from top to buttom

app.get("/", (req, res) => {
  res.json({ message: "Hello Worldfdg" });
});
app.use(express.json());
app.use(identification);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/password", passwordRouter);

function identification(req, res, next) {
  console.log("Auth middleware logic here");
  next();
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
