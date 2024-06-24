import express from "express";
import 'dotenv/config'
import axiosConfig from './config/axiosConfig.js';
import listing from "./routes/listing.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(identification);
app.use(express.json());
app.use("/listing", listing);

function identification(req, res, next) {
  const token = req.body.jwt;
  const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
  try{
    const decoded = jwt.verify(token, jwtSecret);
    res.locals.decodedToken = decoded;
    next();
  }
  catch(err){
    return res.json({message: err});
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});