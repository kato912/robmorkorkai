import { Request, Response } from "express";
import { prisma } from "../utils/prisma.js";

// ==================== STATS ====================
// ดึงสถิติแดชบอร์ดของ Admin
export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        // ดึงจำนวนร้านค้าทั้งหมด
        const totalShops = await prisma.shop.count();

        // ดึงจำนวน Users ทั้งหมด
        const totalUsers = await prisma.user.count();

        // ดึงจำนวน Reviews ทั้งหมด
        const totalReviews = await prisma.review.count();

        // ดึงจำนวน Admins
        const totalAdmins = await prisma.user.count({
            where: { role: "ADMIN" }
        });

        res.json({
            totalShops,
            totalUsers,
            totalReviews,
            totalAdmins,
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ==================== CRUD SHOPS ====================

// ดึงรายการร้านค้าทั้งหมด (สำหรับ Admin - มีข้อมูลมากกว่าผู้ใช้ปกติ)
export const getShopsAdmin = async (req: Request, res: Response) => {
    try {
        const { search, zone, type } = req.query;

        const shops = await prisma.shop.findMany({
            where: {
                name: search ? { contains: String(search) } : undefined,
                zone: zone ? { equals: String(zone) } : undefined,
                type: type ? { equals: String(type) } : undefined,
            },
            include: {
                _count: {
                    select: { reviews: true }
                }
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(shops);
    } catch (error) {
        console.error("Error fetching shops for admin:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// สร้างร้านค้าใหม่ (Admin only)
export const createShopAdmin = async (req: Request, res: Response) => {
    try {
        const { name, type, address, googleMapsUrl, latitude, longitude, zone, coverImage, openHours } = req.body;

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!name || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ 
                message: "Missing required fields: name, latitude, longitude" 
            });
        }

        const newShop = await prisma.shop.create({
            data: {
                name,
                type: type || null,
                address: address || null,
                googleMapsUrl: googleMapsUrl || null,
                latitude,
                longitude,
                zone: zone || null,
                coverImage: coverImage || null,
                openHours: openHours || null,
            }
        });

        res.status(201).json(newShop);
    } catch (error) {
        console.error("Error creating shop:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// อัพเดตร้านค้า (Admin only)
export const updateShopAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, type, address, latitude, longitude, zone, coverImage, openHours } = req.body;

        // ตรวจสอบว่าร้านค้ามีอยู่หรือไม่
        const shop = await prisma.shop.findUnique({
            where: { id }
        });

        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        // อัพเดตข้อมูล
        const updatedShop = await prisma.shop.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(type && { type }),
                ...(address && { address }),
                ...(googleMapsUrl && { googleMapsUrl }),
                ...(latitude !== undefined && { latitude }),
                ...(longitude !== undefined && { longitude }),
                ...(zone && { zone }),
                ...(coverImage && { coverImage }),
                ...(openHours && { openHours }),
            }
        });

        res.json(updatedShop);
    } catch (error) {
        console.error("Error updating shop:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ลบร้านค้า (Admin only)
export const deleteShopAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // ตรวจสอบว่าร้านค้ามีอยู่หรือไม่
        const shop = await prisma.shop.findUnique({
            where: { id }
        });

        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        // ลบร้านค้า (Cascade delete จะลบ reviews ด้วย)
        await prisma.shop.delete({
            where: { id }
        });

        res.json({ message: "Shop deleted successfully" });
    } catch (error) {
        console.error("Error deleting shop:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ดึงรายละเอียดร้านค้า 1 ร้าน (สำหรับ Admin)
export const getShopByIdAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const shop = await prisma.shop.findUnique({
            where: { id },
            include: {
                reviews: {
                    include: {
                        user: {
                            select: { id: true, name: true, image: true, email: true }
                        }
                    },
                    orderBy: { createdAt: 'desc' }
                },
                _count: {
                    select: { reviews: true }
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
