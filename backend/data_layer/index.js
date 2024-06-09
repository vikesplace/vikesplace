import express from "express";
import 'dotenv/config'
import listingRoutes from "./routes/listing_routes.js";
import db from "./config/database.js";

const PORT = process.env.PORT || 5000;
const app = express();

db.sync();

app.use(express.json());
app.use("/listing",listingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
