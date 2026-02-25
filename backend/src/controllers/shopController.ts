import { Request, Response } from "express";
import { prisma } from "../utils/prisma.js";

// 1. ดึงรายการร้านค้าทั้งหมด (รองรับการค้นหาและกรองโซน)
export const getShops = async (req: Request, res: Response) => {
    try {
        const { search, zone, type } = req.query;

        const shops = await prisma.shop.findMany({
            where: {
                name: search ? { contains: String(search) } : undefined,
                zone: zone ? { equals: String(zone) } : undefined,
                type: type ? { equals: String(type) } : undefined,
            },
            // เรียงตามร้านที่มีรีวิวเยอะสุดขึ้นก่อน (เผื่ออนาคตเอาไว้จัดอันดับ)
            orderBy: { reviews: { _count: 'desc' } }, 
            take: 50, // จำกัดการดึงข้อมูลเพื่อไม่ให้แอปค้าง
        });

        res.json(shops);
    } catch (error) {
        console.error("Error fetching shops:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// 2. ดึงรายละเอียดร้าน 1 ร้าน (พร้อมดึงรีวิวของร้านนั้นมาด้วย)
export const getShopById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const shop = await prisma.shop.findUnique({
            where: { id: id },
            include: {
                // ดึงรีวิวมาโชว์ พร้อมกับข้อมูลคนที่รีวิว (เอาแค่ชื่อและรูป)
                reviews: {
                    include: { user: { select: { name: true, image: true } } },
                    orderBy: { createdAt: 'desc' } // รีวิวใหม่ล่าสุดขึ้นก่อน
                }
            }
        });

        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        res.json(shop);
    } catch (error) {
        console.error("Error fetching shop details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};