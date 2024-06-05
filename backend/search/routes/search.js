import express from "express";

const router = express.Router();

//Get search results
router.get("/", (req, res) => {
  res.json({ message: "Get Search Results" });
});

export default router;