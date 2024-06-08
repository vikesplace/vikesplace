import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  // handle login logic here
  res.json({ message: "User logged in" });
});

export default router;
