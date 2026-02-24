

export interface Review {
    id: number;
    userId: string;
    userName?: string | null; 
    userImage?: string | null;
    email?: string | null;
    rating: number;
    comment: string;
    verified: boolean;
    date: string;
}

export interface Shop {
    type: string;
    id: string; // id
    name: string; // ชื่อร้าน
    image: string; // รูปภาพ
    images?: string[]; // รูปภาพเพิ่มเติม
    category: string;// หมวดหมู่
    latitude: number; // ละติจูด
    longitude: number; // ลองจิจูด
    ratingAvg?: number; // เรทคะแนน
    reviewCount: number; // จำนวนการรีวิว
    description: string; // คำอธิบายร้านค้า
    zone: string; // โซน 
    openHours: string; // เวลาเปิดปิด
    googleMap: string; // link ggmap
    owner: string; // เจ้าของร้าน
    ownerEmail: string; // อีเมลเจ้าของร้าน
}