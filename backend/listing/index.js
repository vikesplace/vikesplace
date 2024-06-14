import express from "express";
import 'dotenv/config'
import listing from "./routes/listing.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(identification);
app.use(express.json());
app.use("/listing", listing);

function identification(req, res, next) {
  console.log("Auth middleware logic here");
  next();
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});