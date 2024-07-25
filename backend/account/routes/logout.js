import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    res.cookie("Authorization", "", { httpOnly: true });
    res.status(200).json();
});

export default router;