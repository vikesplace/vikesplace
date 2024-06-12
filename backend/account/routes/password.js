import express from "express";

const router = express.Router();

router.post("/request_reset", (req, res) => {
  // handle request reset logic here
  res.json({ message: "reset password email sent" });
});

router.post("/verify_reset", (req, res) => {
  // handle verify reset logic here
    res.json({ message: "password reset" });
});

export default router;
