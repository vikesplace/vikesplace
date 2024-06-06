import express from "express";
import messages from "./routes/messages.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use(identification);
app.use("/messages", messages);


function identification(req, res, next) {
    console.log("Auth middleware logic here");
    next();
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});