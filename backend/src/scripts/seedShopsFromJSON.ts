// src/scripts/seedShopsFromJSON.ts
import * as fs from "fs";
import * as path from "path";
import { prisma } from "../utils/prisma.js";

interface ShopData {
    name: string;
    type?: string;
    address?: string;
    googleMapsUrl?: string;
    latitude: number;
    longitude: number;
    zone?: string;
    coverImage?: string;
    openHours?: string;
}

interface ShopsJSON {
    shops: ShopData[];
}

async function seedShops() {
    try {
        // อ่าน JSON file
        const filePath = path.join(
            process.cwd(),
            "src/data/shops.json"
        );
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const data: ShopsJSON = JSON.parse(fileContent);

        console.log(`📍 เริ่มสร้างร้านจากไฟล์ JSON...`);
        console.log(`📊 จำนวนร้านที่จะสร้าง: ${data.shops.length}`);

        for (const shopData of data.shops) {
            // ตรวจสอบข้อมูลที่จำเป็น
            if (!shopData.name || shopData.latitude === undefined || shopData.longitude === undefined) {
                console.warn(`⚠️  ข้ามร้าน: ${shopData.name} (ข้อมูลไม่ครบ)`);
                continue;
            }

            // สร้างร้านค้า
            const shop = await prisma.shop.create({
                data: {
                    name: shopData.name,
                    type: shopData.type || null,
                    address: shopData.address || null,
                    googleMapsUrl: shopData.googleMapsUrl || null,
                    latitude: shopData.latitude,
                    longitude: shopData.longitude,
                    zone: shopData.zone || null,
                    coverImage: shopData.coverImage || null,
                    openHours: shopData.openHours || null,
                },
            });

            console.log(`✅ สร้างร้าน: ${shop.name} (ID: ${shop.id})`);
        }

        console.log(`\n✨ เสร็จแล้ว! สร้างร้านทั้งหมด ${data.shops.length} ร้าน`);

        // แสดงสถิติ
        const totalShops = await prisma.shop.count();

        console.log(`📊 สถิติรวม:`);
        console.log(`  - ร้านค้าทั้งหมด: ${totalShops}`);
    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาด:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

seedShops();
