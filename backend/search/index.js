import express from "express";
import search from "./routes/search.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(identification);
app.use("/search", search);

function identification(req, res, next) {
    console.log("Auth middleware logic here");
    next();
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});