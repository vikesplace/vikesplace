import express from "express";
import userdata from "./routes/userdata.js";
import searchhistory from "./routes/searchhistory.js";

const PORT = process.env.PORT || 5500;
const app = express();


app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use(identification);
app.use("/userdata", userdata);
app.use("/searchhistory", searchhistory);

function identification(req, res, next) {
    console.log("Auth middleware logic here");
    next();
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});