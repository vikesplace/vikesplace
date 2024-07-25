import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.cookie("Authorization", "", { httpOnly: true });
    res.status(200).json();
  } catch (err) {
    console.error(err);
    res.status(500).json();
  }
});

export default router;
