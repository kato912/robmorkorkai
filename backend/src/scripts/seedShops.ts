// src/scripts/seedShops.ts
import axios from "axios";
import { prisma } from "../utils/prisma.js";

// 📍 กำหนดจุดศูนย์กลางและรัศมีวงกลมสำหรับดึงข้อมูลรอบแรก (ดึงมากว้างๆ ก่อน)
const KKU_LAT = 16.456832;
const KKU_LON = 102.817876;
const RADIUS = 2000; 

const ZONES = [
    {
        name: "langmo",
        polygon: [
            [102.818401717553, 16.4798121813824],
            [102.81892278833368, 16.48028554770208],
            [102.82287195634666, 16.48096929701154],
            [102.82868600925411, 16.48217900141286],
            [102.83186728348693, 16.48346759126818],
            [102.82860373491962, 16.482126405726177],
            [102.83173015959744, 16.48346759126818],
            [102.83194955781948, 16.488832240531792],
            [102.80131608094229, 16.489778927910635],
            [102.80433280650806, 16.481100786985735],
            [102.818401717553, 16.4798121813824] 
        ]
    },
    {
        name: "กังสดาล",
        polygon: [
            [102.82222178343511,16.46525362188575],
            [102.81936128032049,16.441266731890735],
            [102.83072994654634,16.439402523903908],
            [102.83161010135137,16.46388201752336],
            [102.82896963693764,16.46437438943657],
            [102.82222178343511,16.46525362188575]
    ]
    },{
        name: "โคลัมโบ",
        polygon: [
            [102.80540511312779,16.48099986198109],
            [102.80031518934777,16.48139347436299],
            [102.79904270840314,16.461987431801333],
            [102.80306539009939,16.461200127399906],
            [102.80540511312779,16.48099986198109]
        ]
    },{
        name: "ในมอ",
        polygon: [
            [102.8317129381175,16.464068741461247],
            [102.83247131151865,16.48205777810169],
            [102.81833072154268,16.480178777476524],
            [102.80518017378023,16.480946871566985],
            [102.80234924552627,16.455789308391985],
            [102.80741940704388,16.455194160382845],
            [102.80706672598336,16.451520955762376],
            [102.81071208865649,16.451097614064082],
            [102.80991744157194,16.442554202362246],
            [102.81908170850033,16.44144870059968],
            [102.82200298627424,16.465008274798976],
            [102.8317129381175,16.464068741461247]
        ]
    }
];

function isPointInPolygon(point: [number, number], polygon: number[][]): boolean {
    const x = point[0]; 
    const y = point[1]; 
    let isInside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i]![0], yi = polygon[i]![1];
        const xj = polygon[j]![0], yj = polygon[j]![1];

        const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
    }

    return isInside;
}

// 👇 แก้ไข: ถ้านอกโซน ให้ return null (แทนที่จะเป็น "Other")
function determineZone(lat: number, lon: number): string | null {
    const point: [number, number] = [lon, lat];

    for (const zone of ZONES) {
        if (isPointInPolygon(point, zone.polygon)) {
            return zone.name;
        }
    }

    return null; // ไม่อยู่ในโซนไหนเลย
}

function categorizeType(osmType: string): string {
    if (["bar", "pub", "nightclub", "biergarten"].includes(osmType)) {
        return "Nightlife & Bar"; 
    }
    if (["cafe", "ice_cream", "bubble_tea"].includes(osmType)) {
        return "Cafe & Dessert"; 
    }
    if (["food_court", "fast_food"].includes(osmType)) {
        return "Street Food / Quick Meal"; 
    }
    return "Restaurant"; 
}

async function fetchAndSeedShops() {
    console.log("🚀 Starting to fetch shops from OSM...");

    const query = `
        [out:json][timeout:25];
        (
            node["amenity"~"restaurant|cafe|fast_food|food_court|bar|pub|nightclub|biergarten|ice_cream"](around:${RADIUS}, ${KKU_LAT}, ${KKU_LON});
        );
        out body;
    `;

try {
        const response = await axios.post("https://overpass-api.de/api/interpreter", 
            `data=${encodeURIComponent(query)}`, 
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        if (!response.data || !response.data.elements) {
            console.error("❌ API ไม่ได้ส่งข้อมูลร้านกลับมา! ลองดูข้อมูลดิบที่ได้มาด้านล่างครับ:");
            console.log(response.data); // ปริ้นต์ดูว่ามันคือ HTML Error หรือเปล่า
            return; // หยุดการทำงานของฟังก์ชัน
        }

        const shops = response.data.elements;
        console.log(`📦 Found ${shops.length} locations within the ${RADIUS}m radius.`);

        let count = 0;
        let skippedCount = 0; // ตัวแปรนับว่าข้ามไปกี่ร้าน

        for (const shop of shops) {
            if (!shop.tags.name) continue;

            const zone = determineZone(shop.lat, shop.lon);

            // 👇👇 เพิ่มเงื่อนไขนี้: ถ้าไม่อยู่ในโซน GeoJSON เลย (zone เป็น null) ให้ข้าม ไม่ต้องเซฟ
            if (!zone) {
                skippedCount++;
                continue; 
            }

            const cleanType = categorizeType(shop.tags.amenity); 

            await prisma.shop.upsert({
                where: { osmId: shop.id.toString() },
                update: {
                    name: shop.tags.name,
                    latitude: shop.lat,
                    longitude: shop.lon,
                    type: cleanType, 
                    zone: zone,
                    openHours: shop.tags.opening_hours || null
                },
                create: {
                    osmId: shop.id.toString(),
                    name: shop.tags.name,
                    latitude: shop.lat,
                    longitude: shop.lon,
                    type: cleanType,
                    zone: zone,
                    openHours: shop.tags.opening_hours || null
                }
            });
            count++;
        }

        console.log(`⏭️ Skipped ${skippedCount} shops (outside of GeoJSON zones).`);
        console.log(`✅ Successfully seeded/updated ${count} shops strictly inside the zones!`);

    } catch (error) {
        console.error("❌ Error seeding shops:", error);
    } finally {
        await prisma.$disconnect();
    }
}

fetchAndSeedShops();