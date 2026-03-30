import express from "express";
import { 
    getMe, 
    updateMe,
    getUserFavorites,
    addToFavorites,
    removeFromFavorites,
    getUserReviews
} from "../controllers/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);

// ============ USER INFO ============
router.get("/info", getMe);
router.patch("/update", updateMe);

// ============ USER FAVORITES ============
router.get("/favorites", getUserFavorites); // GET /api/users/favorites
router.post("/favorites/:shopId", addToFavorites); // POST /api/users/favorites/:shopId
router.delete("/favorites/:shopId", removeFromFavorites); // DELETE /api/users/favorites/:shopId

// ============ USER REVIEWS ============
router.get("/reviews", getUserReviews); // GET /api/users/reviews

export default router;