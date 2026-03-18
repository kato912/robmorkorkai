import express from "express";
import { createReview, getReviewsByShopId } from "../controllers/reviewController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:shopId", getReviewsByShopId); // GET /api/reviews/:shopId (public)

router.use(requireAuth);
router.post("/", createReview); 

export default router;