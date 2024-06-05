import express from "express";
import userdata from "./routes/user_data.js";
import searchhistory from "./routes/search_history.js";

const PORT = process.env.PORT || 5000;
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