// src/data/mockDatat.ts

import { 
    // Filter, 
    Coffee, 
    Utensils, 
    BookOpen, 
    Wifi, 
    Car, 
    Clock, 
    Snowflake 
} from "lucide-react";

// ✅ 1. Interface หลักของร้านค้า
export interface Shop {
    id: string;
    name: string;
    image: string;
    rating: number;
    reviewCount: number;
    zoneId: string;
    zone: string;
    category: string;
    categoryLabel: string;
    verified: boolean;
    facilities: string[];
    priceRange: string;
    openHours: string;     
    description: string;
    googleMap?: string; // Optional field
}

// ✅ 2. ข้อมูล Zones
export const ZONES = [
    { id: "kangsadan", label: "กังสดาล", labelEn: "Kangsadan" },
    { id: "langmor", label: "หลังมอ", labelEn: "Langmor" },
    { id: "bueng", label: "ฝั่งบึง", labelEn: "Bueng Kaen Nakhon" },
];

// ✅ 3. ข้อมูล Categories
export const CATEGORIES = [
    { id: "cafe", label: "คาเฟ่", icon: Coffee },
    { id: "restaurant", label: "ร้านอาหาร", icon: Utensils },
    { id: "dessert", label: "ของหวาน", icon: Snowflake }, // เพิ่ม icon ให้ของหวาน
    { id: "study", label: "อ่านหนังสือ", icon: BookOpen },
];

// ✅ 4. ข้อมูล Facilities (สิ่งอำนวยความสะดวก)
export const FACILITIES = [
    { id: "wifi", label: "มี WiFi", icon: Wifi },
    { id: "parking", label: "ที่จอดรถ", icon: Car },
    { id: "aircon", label: "แอร์", icon: Snowflake },
    { id: "24hr", label: "เปิด 24 ชม.", icon: Clock },
];

// ✅ 5. Mock Data ร้านค้า (รวม 5 ร้านตัวอย่าง เพื่อทดสอบ Filter)
export const MOCK_SHOPS: Shop[] = [
    {
        id: "1",
        name: "Library Cafe KKU",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=500&q=80",
        rating: 4.7,
        reviewCount: 95,
        zoneId: "kangsadan",
        zone: "กังสดาล",
        category: "คาเฟ่",
        categoryLabel: "คาเฟ่",
        verified: true,
        facilities: ["wifi", "aircon", "parking"],
        priceRange: "฿฿",
        openHours: "09:00 - 21:00",
        description: "บรรยากาศเงียบสงบ เหมาะกับการอ่านหนังสือและทำงาน มีปลั๊กไฟทุกโต๊ะ",
        googleMap: "https://maps.google.com/?q=Library+Cafe+KKU"
    },
    {
        id: "2",
        name: "Study Space Cafe",
        image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=500&q=80",
        rating: 4.8,
        reviewCount: 128,
        zoneId: "kangsadan",
        zone: "กังสดาล",
        category: "อ่านหนังสือ",
        categoryLabel: "อ่านหนังสือ",
        verified: true,
        facilities: ["wifi", "aircon", "parking"],
        priceRange: "฿฿",
        openHours: "08:00 - 22:00",
        description: "Co-working space สุดฮิตของนักศึกษา ตกแต่งสไตล์มินิมอล",
        googleMap: "https://maps.google.com/?q=Study+Space+Cafe"
    },
    {
        id: "3",
        name: "Midnight Brew",
        image: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?auto=format&fit=crop&w=500&q=80",
        rating: 4.5,
        reviewCount: 67,
        zoneId: "langmor",
        zone: "หลังมอ",
        category: "คาเฟ่",
        categoryLabel: "คาเฟ่",
        verified: false,
        facilities: ["wifi", "24hr", "parking"],
        priceRange: "฿",
        openHours: "เปิด 24 ชม.",
        description: "กาแฟเข้มข้น เปิดตลอด 24 ชั่วโมง สำหรับคนนอนดึกและช่วงสอบ",
        googleMap: "https://maps.google.com/?q=Midnight+Brew"
    },
    {
        id: "4",
        name: "Bingsu Paradise",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80",
        rating: 4.2,
        reviewCount: 45,
        zoneId: "bueng",
        zone: "ฝั่งบึง",
        category: "ของหวาน",
        categoryLabel: "ของหวาน",
        verified: false,
        facilities: ["wifi", "aircon"],
        priceRange: "฿฿฿",
        openHours: "10:00 - 22:00",
        description: "บิงซูเกล็ดหิมะ ผลไม้สดใหม่ ถ้วยใหญ่จุใจ",
        googleMap: "https://maps.google.com/?q=Bingsu+Paradise"
    },
    {
        id: "5",
        name: "Isan Zab Nua",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=500&q=80",
        rating: 4.6,
        reviewCount: 210,
        zoneId: "langmor",
        zone: "หลังมอ",
        category: "ร้านอาหาร",
        categoryLabel: "ร้านอาหาร",
        verified: true,
        facilities: ["parking", "wifi"],
        priceRange: "฿฿",
        openHours: "11:00 - 23:00",
        description: "อาหารอีสานรสเด็ด ส้มตำ ไก่ย่าง แซ่บถึงใจ ราคาเป็นกันเอง",
        googleMap: "https://maps.google.com/?q=Isan+Zab+Nua"
    }
];