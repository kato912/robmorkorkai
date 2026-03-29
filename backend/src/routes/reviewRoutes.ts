import express from "express";
import { createReview, getReviewsByShop } from "../controllers/reviewController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/shop/:shopId", getReviewsByShop);
router.post("/", requireAuth, createReview);

export default router;