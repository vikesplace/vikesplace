import express from "express";
import review from "./routes/.js"; //UPDATE PATH

const PORT = process.env.PORT || 5000;
const app = express(); 

// cution: middleware chain matches the route from top to buttom

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});


app.use("/review", review);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});