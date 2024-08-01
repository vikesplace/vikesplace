import express from "express";
import 'dotenv/config';
import { registerUser } from "../controllers/register_user.js";

const router = express.Router();

// Endpoint to request account creation
router.post('/', registerUser);

export default router;
