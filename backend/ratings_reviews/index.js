import express from "express";
import review from "./routes/review.js";
import rating from "./routes/rating.js";

const PORT = process.env.PORT || 5000;
const app = express();

// cution: middleware chain matches the route from top to buttom

app.use(identification);
app.use("/review", review);
app.use("/rating", rating);

function identification(req, res, next) {
  console.log("Auth middleware logic here");
  next();
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
