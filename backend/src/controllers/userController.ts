import { Request, Response } from "express";
import { prisma } from "../utils/prisma.js";

export const getMe = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user?.id;

        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                isVerifiedStudent: true
            }
        });

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const updateMe = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user?.id;
        const { name, image } = req.body; // รับค่าที่ Frontend ส่งมา

        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: name,
                image: image
            }
        });

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating user" });
    }
};

// ==================== USER FAVORITES ====================

// ดึงร้านที่ user บันทึกเป็น favorite
export const getUserFavorites = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user;
        if (!user || !user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const favorites = await prisma.favorite.findMany({
            where: { userId: user.id },
            include: {
                shop: true
            }
        });

        const shops = favorites.map((fav: any) => fav.shop);
        res.json(shops);
    } catch (error) {
        console.error("Error fetching user favorites:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// เพิ่มร้านเข้า favorite
export const addToFavorites = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user;
        if (!user || !user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { shopId } = req.params;

        // ตรวจสอบว่าร้านมีอยู่
        const shop = await prisma.shop.findUnique({
            where: { id: shopId }
        });

        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        // เพิ่ม favorite
        const favorite = await prisma.favorite.create({
            data: {
                userId: user.id,
                shopId: shopId
            }
        });

        res.status(201).json(favorite);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return res.status(400).json({ message: "Already in favorites" });
        }
        console.error("Error adding to favorites:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ลบร้านออกจาก favorite
export const removeFromFavorites = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user;
        if (!user || !user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { shopId } = req.params;

        const favorite = await prisma.favorite.deleteMany({
            where: {
                userId: user.id,
                shopId: shopId
            }
        });

        if (favorite.count === 0) {
            return res.status(404).json({ message: "Not in favorites" });
        }

        res.json({ message: "Removed from favorites" });
    } catch (error) {
        console.error("Error removing from favorites:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ==================== USER REVIEWS ====================

// ดึงรายชื้อร้านที่ user review แล้ว
export const getUserReviews = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user;
        if (!user || !user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const reviews = await prisma.review.findMany({
            where: { userId: user.id },
            include: {
                shop: true
            }
        });

        // ส่ง shop data พร้อมกับ review info ของ user
        const reviewedShops = reviews.map((review: any) => ({
            ...review.shop,
            userReview: {
                id: review.id,
                rating: review.rating,
                comment: review.comment,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt
            }
        }));

        res.json(reviewedShops);
    } catch (error) {
        console.error("Error fetching user reviews:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};