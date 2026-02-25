import express from "express";
import { createReview } from "../controllers/reviewController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(requireAuth);
router.post("/", createReview); 

export default router;