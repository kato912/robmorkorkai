import express from "express";
import { getMe, updateMe } from "../controllers/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);


router.get("/info", getMe);

router.patch("/update", updateMe);

export default router;