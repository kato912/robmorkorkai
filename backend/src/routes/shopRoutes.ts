import express from "express";
import { 
    getShops, 
    getShopById,
    getStats,
    getShopImage
} from "../controllers/shopController.js";

const router = express.Router();

// ============ PUBLIC ENDPOINTS ============
// Special routes first (to avoid being caught by :id route)
router.get("/stats", getStats); // GET /api/shops/stats - App statistics
router.get("/image/:id", getShopImage); // GET /api/shops/image/:id - Shop image proxy
router.get("/", getShops); // GET /api/shops
router.get("/:id", getShopById); // GET /api/shops/:id

export default router;