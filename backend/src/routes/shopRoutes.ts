import express from "express";
import { getShops, getShopById } from "../controllers/shopController.js";

const router = express.Router();

router.get("/", getShops); // GET /api/shops
router.get("/:id", getShopById); // GET /api/shops/:id

export default router;