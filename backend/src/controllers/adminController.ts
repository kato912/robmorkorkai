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
        const { osmId, name, type, address, latitude, longitude, zone, coverImage, openHours } = req.body;

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!osmId || !name || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ 
                message: "Missing required fields: osmId, name, latitude, longitude" 
            });
        }

        // ตรวจสอบว่า osmId มีอยู่แล้วหรือไม่
        const existingShop = await prisma.shop.findUnique({
            where: { osmId }
        });

        if (existingShop) {
            return res.status(409).json({ message: "Shop with this osmId already exists" });
        }

        const newShop = await prisma.shop.create({
            data: {
                osmId,
                name,
                type: type || null,
                address: address || null,
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
                images: {
                    orderBy: { order: 'asc' }
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

// ==================== SHOP IMAGES ====================

// ดึงรูปภาพทั้งหมดของร้านค้า
export const getShopImages = async (req: Request, res: Response) => {
    try {
        const { shopId } = req.params;

        // ตรวจสอบว่าร้านค้ามีอยู่หรือไม่
        const shop = await prisma.shop.findUnique({
            where: { id: shopId }
        });

        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        const images = await prisma.shopImage.findMany({
            where: { shopId },
            orderBy: { order: 'asc' }
        });

        res.json(images);
    } catch (error) {
        console.error("Error fetching shop images:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// เพิ่มรูปภาพให้ร้านค้า
export const addShopImage = async (req: Request, res: Response) => {
    try {
        const { shopId } = req.params;
        const { url, alt } = req.body;

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!url) {
            return res.status(400).json({ message: "Missing required field: url" });
        }

        // ตรวจสอบว่าร้านค้ามีอยู่หรือไม่
        const shop = await prisma.shop.findUnique({
            where: { id: shopId }
        });

        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        // หาลำดับใหม่ (order อันถัดไป)
        const lastImage = await prisma.shopImage.findFirst({
            where: { shopId },
            orderBy: { order: 'desc' }
        });

        const newOrder = (lastImage?.order ?? -1) + 1;

        const newImage = await prisma.shopImage.create({
            data: {
                url,
                alt: alt || null,
                order: newOrder,
                shopId
            }
        });

        // ถ้านี่เป็นรูปแรก ให้อัพเดต coverImage ด้วย
        if (newOrder === 0) {
            await prisma.shop.update({
                where: { id: shopId },
                data: { coverImage: url }
            });
        }

        res.status(201).json(newImage);
    } catch (error) {
        console.error("Error adding shop image:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// อัพเดตรูปภาพ
export const updateShopImage = async (req: Request, res: Response) => {
    try {
        const { shopId, imageId } = req.params;
        const { url, alt, order } = req.body;

        // ตรวจสอบว่าร้านค้ามีอยู่หรือไม่
        const shop = await prisma.shop.findUnique({
            where: { id: shopId }
        });

        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        // ตรวจสอบว่ารูปมีอยู่หรือไม่
        const image = await prisma.shopImage.findUnique({
            where: { id: imageId }
        });

        if (!image || image.shopId !== shopId) {
            return res.status(404).json({ message: "Image not found" });
        }

        const updatedImage = await prisma.shopImage.update({
            where: { id: imageId },
            data: {
                ...(url && { url }),
                ...(alt !== undefined && { alt }),
                ...(order !== undefined && { order })
            }
        });

        res.json(updatedImage);
    } catch (error) {
        console.error("Error updating shop image:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ลบรูปภาพ
export const deleteShopImage = async (req: Request, res: Response) => {
    try {
        const { shopId, imageId } = req.params;

        // ตรวจสอบว่าร้านค้ามีอยู่หรือไม่
        const shop = await prisma.shop.findUnique({
            where: { id: shopId }
        });

        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        // ตรวจสอบว่ารูปมีอยู่หรือไม่
        const image = await prisma.shopImage.findUnique({
            where: { id: imageId }
        });

        if (!image || image.shopId !== shopId) {
            return res.status(404).json({ message: "Image not found" });
        }

        // ถ้าลบรูปแรก (order=0) ให้อัพเดต coverImage เป็นรูปถัดไป
        const isFirstImage = image.order === 0;
        
        await prisma.shopImage.delete({
            where: { id: imageId }
        });

        if (isFirstImage) {
            // หารูปที่มี order ต่ำที่สุดเพื่อเป็น cover image
            const nextImage = await prisma.shopImage.findFirst({
                where: { shopId },
                orderBy: { order: 'asc' }
            });

            if (nextImage) {
                await prisma.shop.update({
                    where: { id: shopId },
                    data: { coverImage: nextImage.url }
                });
            } else {
                // ถ้าไม่มีรูปเหลือแล้ว ให้ clear coverImage
                await prisma.shop.update({
                    where: { id: shopId },
                    data: { coverImage: null }
                });
            }
        }

        res.json({ message: "Image deleted successfully" });
    } catch (error) {
        console.error("Error deleting shop image:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
