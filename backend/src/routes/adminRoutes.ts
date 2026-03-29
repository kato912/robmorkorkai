import express from "express";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";
import {
    getDashboardStats,
    getShopsAdmin,
    createShopAdmin,
    updateShopAdmin,
    deleteShopAdmin,
    getShopByIdAdmin,
    getShopImages,
    addShopImage,
    updateShopImage,
    deleteShopImage,
} from "../controllers/adminController.js";

const router = express.Router();

// ============ MIDDLEWARE ============
// ทุก route ต้อง login (requireAuth) และเป็น admin (requireAdmin)
router.use(requireAuth);
router.use(requireAdmin);

// ============ STATS ============
router.get("/stats", getDashboardStats); // GET /api/admin/stats

// ============ SHOPS CRUD ============
router.get("/shops", getShopsAdmin); // GET /api/admin/shops
router.get("/shops/:id", getShopByIdAdmin); // GET /api/admin/shops/:id
router.post("/shops", createShopAdmin); // POST /api/admin/shops
router.put("/shops/:id", updateShopAdmin); // PUT /api/admin/shops/:id
router.delete("/shops/:id", deleteShopAdmin); // DELETE /api/admin/shops/:id

// ============ SHOP IMAGES CRUD ============
router.get("/shops/:shopId/images", getShopImages); // GET /api/admin/shops/:shopId/images
router.post("/shops/:shopId/images", addShopImage); // POST /api/admin/shops/:shopId/images
router.put("/shops/:shopId/images/:imageId", updateShopImage); // PUT /api/admin/shops/:shopId/images/:imageId
router.delete("/shops/:shopId/images/:imageId", deleteShopImage); // DELETE /api/admin/shops/:shopId/images/:imageId

export default router;
