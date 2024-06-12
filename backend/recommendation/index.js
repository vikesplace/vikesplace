import express from "express";
import recommendation from "./routes/recommendation.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(identification);
app.use("/recommendation", recommendation);

function identification(req, res, next) {
    console.log("Auth middleware logic here");
    next();
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});