import express from "express";

const router = express.Router();

// cution: middleware chain matches the route from top to buttom

router.get("/", (req, res) => {
  res.json({ message: "login" });
});

router.post("/", (req, res) => {
  // Handle login logic
  // ...
  res.json({ message: "User logged in" });
});

export default router;
