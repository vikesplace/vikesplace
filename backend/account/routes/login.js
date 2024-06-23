import express from "express";
import axios from "axios";
import { check, validationResult } from "express-validator";

const router = express.Router();

// Validation rules for login
const loginValidation = [
  check('username').not().isEmpty().withMessage('Username is required'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/).withMessage('Password must contain at least one special character')
];

router.post("/", loginValidation, async (req, res) => {
  console.log("here inside the login")
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map(err => err.msg).join(', ') });
  }

  const { username, password } = req.body;

  try {
    // Call the /user/login endpoint using Axios
    console.log("hest before the the axios call")
    const response = await axios.post("/user/login/", {
      username,
      password
    });

  } catch (error) {
    // Handle error response
    if (error.response) {
      return res.status(error.response.status).json({ message: error.response.data.message });
    } else {
      console.error('Error calling login endpoint:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
});

export default router;
