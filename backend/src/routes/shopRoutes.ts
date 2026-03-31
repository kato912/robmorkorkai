import express from "express";
import { 
    getShops, 
    getShopById,
    getStats
} from "../controllers/shopController.js";

const router = express.Router();

// ============ PUBLIC ENDPOINTS ============
router.get("/stats", getStats); // GET /api/shops/stats - App statistics
router.get("/", getShops); // GET /api/shops
router.get("/:id", getShopById); // GET /api/shops/:id

export default router;