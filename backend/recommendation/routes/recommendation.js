import express from "express";

const router = express.Router();

//Get recommendations
router.get("/", (req, res) => {
  res.json({ message: "Get Recommendations" });
});

//Ignore recommendation
router.post("/:listingId/ignore", (req, res) => {
  res.json({ message: "Ignore Recommendation" });
});

export default router;