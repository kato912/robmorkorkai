import {
    Filter, Coffee, Utensils, BookOpen, Wifi, Car, Clock
} from "lucide-react";

// ✅ 1. ประกาศ Interface Shop ไว้ตรงนี้ (เพื่อให้ไฟล์อื่น import ไปใช้ได้)
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
}

export const ZONES = [
    { id: "all", label: "ทุกโซน" , labelEn: "all"},
    { id: "kangsadan", label: "กังสดาล", labelEn: "kangsadan"},
    { id: "langmor", label: "หลังมอ", labelEn: "langmor" },
    { id: "bueng", label: "ฝั่งบึง", labelEn: "bueng"},
];

export const CATEGORIES = [
    { id: "all", label: "ทั้งหมด", icon: Filter },
    { id: "cafe", label: "คาเฟ่", icon: Coffee },
    { id: "restaurant", label: "ร้านอาหาร", icon: Utensils },
    { id: "study", label: "ที่อ่านหนังสือ", icon: BookOpen },
];

export const FACILITIES = [
    { id: "wifi", label: "มี WiFi", icon: Wifi },
    { id: "parking", label: "ที่จอดรถ", icon: Car },
    { id: "aircon", label: "แอร์", icon: Coffee },
    { id: "24hr", label: "เปิด 24 ชม.", icon: Clock },
];

// ✅ 2. ระบุ Type : Shop[] ให้ตัวแปรนี้
export const MOCK_SHOPS: Shop[] = [
    {
        id: "1",
        name: "Library Cafe KKU",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=500&q=80",
        rating: 4.7,
        reviewCount: 95,
        zoneId: "kangsadan",
        zone: "กังสดาล",
        category: "cafe",
        categoryLabel: "คาเฟ่",
        verified: true,
        facilities: ["wifi", "aircon"],
        priceRange: "$",
        openHours: "09:00 - 21:00",
        description: "บรรยากาศเงียบสงบ เหมาะกับการอ่านหนังสือและทำงาน",
    },
    {
        id: "2",
        name: "Study Space Cafe",
        image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=500&q=80",
        rating: 4.8,
        reviewCount: 128,
        zoneId: "kangsadan",
        zone: "กังสดาล",
        category: "cafe",
        categoryLabel: "คาเฟ่",
        verified: true,
        facilities: ["wifi", "aircon", "parking"],
        priceRange: "$$",
        openHours: "08:00 - 22:00",
        description: "คาเฟ่สไตล์มินิมอล บรรยากาศดี",
    },
    {
        id: "3",
        name: "Midnight Brew",
        image: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?auto=format&fit=crop&w=500&q=80",
        rating: 4.5,
        reviewCount: 67,
        zoneId: "langmor",
        zone: "หลังมอ",
        category: "cafe",
        categoryLabel: "คาเฟ่",
        verified: false,
        facilities: ["wifi", "24hr"],
        priceRange: "$",
        openHours: "เปิด 24 ชม.",
        description: "เปิดตลอด 24 ชั่วโมง สำหรับคนนอนดึก",
    },
    {
        id: "4",
        name: "Bingsu Paradise",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80",
        rating: 4.2,
        reviewCount: 45,
        zoneId: "bueng",
        zone: "ฝั่งบึง",
        category: "restaurant",
        categoryLabel: "ของหวาน",
        verified: false,
        facilities: ["wifi", "parking"],
        priceRange: "$$",
        openHours: "10:00 - 22:00",
        description: "บิงซูเกล็ดหิมะ ผลไม้สดใหม่",
    }
];