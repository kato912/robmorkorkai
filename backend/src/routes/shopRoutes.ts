import express from "express";
import { 
    getShops, 
    getShopById
} from "../controllers/shopController.js";

const router = express.Router();

// ============ PUBLIC ENDPOINTS ============
router.get("/", getShops); // GET /api/shops
router.get("/:id", getShopById); // GET /api/shops/:id

export default router;