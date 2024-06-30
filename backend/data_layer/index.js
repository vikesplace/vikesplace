import express from "express";
import 'dotenv/config';
import listingRoutes from "./routes/listing_routes.js";
import ratingRoutes from "./routes/rating_routes.js";
import reviewRoutes from "./routes/review_routes.js";
import userRoutes from "./routes/user_routes.js";
import searchRoutes from "./routes/search_routes.js";
import recommendationRoutes from "./routes/recommendation_routes.js";
import messageRoutes from "./routes/message_routes.js";
import chatRoutes from "./routes/chat_routes.js";
import db from "./config/database.js";

const PORT = process.env.PORT || 5000;
const app = express();

db.sync();

app.use(express.json());
app.use("/user",userRoutes);
app.use("/listing",listingRoutes);
app.use("/rating",ratingRoutes);
app.use("/review",reviewRoutes);
app.use("/search",searchRoutes);
app.use("/recommendation",recommendationRoutes);
app.use("/message", messageRoutes);
app.use("/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
