import express from "express";
import { createReview } from "../controllers/reviewController";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();
router.use(requireAuth);
router.post("/", createReview); 

export default router;