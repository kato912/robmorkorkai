import { Request, Response } from "express";
import { prisma } from "../utils/prisma.js";
import https from "https";
import http from "http";

// 1. ดึงรายการร้านค้าทั้งหมด (รองรับการค้นหาและกรองโซน)
export const getShops = async (req: Request, res: Response) => {
    try {
        const { search, zone, type, limit } = req.query;
        const take = limit ? parseInt(String(limit)) : 1000; // Default 1000 ร้าน

        const shops = await prisma.shop.findMany({
            where: {
                name: search ? { contains: String(search) } : undefined,
                zone: zone ? { equals: String(zone) } : undefined,
                type: type ? { equals: String(type) } : undefined,
            },
            // เรียงตามร้านที่มีรีวิวเยอะสุดขึ้นก่อน (เผื่ออนาคตเอาไว้จัดอันดับ)
            orderBy: { reviews: { _count: 'desc' } }, 
            take: take,
        });

        res.json(shops);
    } catch (error) {
        console.error("Error fetching shops:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// 1.5. ดึงสถิติแอปพลิเคชัน (จำนวนร้าน จำนวนรีวิว)
// ใช้สำหรับ Login Page features display
export const getStats = async (req: Request, res: Response) => {
    try {
        // ดึงจำนวนร้านทั้งหมด
        const shopCount = await prisma.shop.count();

        // ดึงจำนวนรีวิวทั้งหมด
        const reviewCount = await prisma.review.count();

        res.json({
            shops: shopCount,
            reviews: reviewCount,
            aiPowered: true // Always true for now
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
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

// 3. Return shop image URL directly (client-side cross-origin will be handled by browser)
export const getShopImage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const shop = await prisma.shop.findUnique({
            where: { id: id },
            select: { coverImage: true, image: true }
        });

        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        const imageUrl = shop.coverImage || shop.image;
        
        if (!imageUrl) {
            // ส่ง placeholder SVG
            const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#231c18;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#3d302a;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="400" height="300" fill="url(#grad)"/>
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="#9a8a7e">No Image Available</text>
            </svg>`;
            res.setHeader("Content-Type", "image/svg+xml");
            res.setHeader("Cache-Control", "public, max-age=86400");
            return res.send(placeholderSvg);
        }

        // Send image URL as redirect (allow browser to handle CORS)
        res.setHeader("Cache-Control", "public, max-age=3600");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.redirect(imageUrl);
    } catch (error) {
        console.error("Error in getShopImage:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};