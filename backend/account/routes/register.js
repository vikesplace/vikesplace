import express from "express";

const router = express.Router();

router.post("/request_request", (req, res) => {
  // handle request account logic here
  res.json({ message: "verification email sent" });
});

router.post("/verify_account", (req, res) => {
  // handle verify account logic here
  res.json({ message: "user registered" });
});

export default router;
