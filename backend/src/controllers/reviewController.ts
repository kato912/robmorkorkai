import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const createReview = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized Please Sign In" });
        }

        const { shopId, rating, comment } = req.body;

        if (!shopId || !rating || !comment) {
            return res.status(400).json({ message: "Missing required fields (shopId, rating, comment)" });
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        // ---------------------------------------------------------
        // 🛡️ ส่วนที่ 1: Anti-Spam (เช็คว่าเคยรีวิวร้านนี้หรือยัง?)
        // ---------------------------------------------------------
        
        let review;
        // 1. ลองค้นหาดูว่า User คนนี้ เคยมีรีวิวในร้านนี้ไหม
        const existingReview = await prisma.review.findFirst({
            where: { userId: userId, shopId: shopId }
        });

        if (existingReview) {
            // 2A. ถ้าเคยรีวิวแล้ว -> ให้ "อัปเดต" รีวิวเดิม (ห้ามสร้างใหม่)
            review = await prisma.review.update({
                where: { id: existingReview.id },
                data: { rating: Number(rating), comment: comment }
            });
            console.log("🔄 Updated existing review for shop:", shopId);
        } else {
            // 2B. ถ้ายังไม่เคย -> "สร้าง" รีวิวใหม่ได้เลย
            review = await prisma.review.create({
                data: {
                    rating: Number(rating),
                    comment: comment,
                    userId: userId,
                    shopId: shopId,
                }
            });
            console.log("✅ Created new review for shop:", shopId);
        }

        // ---------------------------------------------------------
        // 📊 ส่วนที่ 2: Average Rating Logic (คำนวณคะแนนเฉลี่ยใหม่)
        // ---------------------------------------------------------
        
        // 1. ให้ Prisma ไปเหมานับรีวิวทั้งหมดของร้านนี้มา
        const aggregations = await prisma.review.aggregate({
            where: { shopId: shopId },
            _avg: { rating: true }, // หาค่าเฉลี่ยของช่อง rating
            _count: { id: true }    // นับจำนวนรีวิวทั้งหมด
        });

        const newRatingAvg = aggregations._avg.rating || 0;
        const totalReviews = aggregations._count.id || 0;

        // 2. เอาค่าเฉลี่ยใหม่ ไปอัปเดตใส่ตาราง Shop
        await prisma.shop.update({
            where: { id: shopId },
            data: {
                ratingAvg: newRatingAvg,
                reviewCount: totalReviews
            }
        });

        // ---------------------------------------------------------
        
        // ดึงข้อมูลรีวิวล่าสุดพร้อมหน้าตาคนรีวิวส่งกลับไปให้ Frontend
        const finalReview = await prisma.review.findUnique({
            where: { id: review.id },
            include: { user: { select: { name: true, image: true } } }
        });

        res.status(200).json({
            message: existingReview ? "Review updated" : "Review created",
            review: finalReview,
            shopSummary: {
                newRatingAvg: newRatingAvg,
                totalReviews: totalReviews
            }
        });

    } catch (error) {
        console.error("Error creating/updating review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};