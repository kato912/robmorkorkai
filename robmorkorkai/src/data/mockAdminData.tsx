export type StoreStatus = "pending" | "approved" | "rejected";

export interface ShopRequest {
    id: string;
    name: string;
    owner: string;
    ownerEmail?: string;
    zone: string;
    category: string;
    status: string;
    submittedAt?: string;
    image: string;
    description?: string;
    mapsLink?: string;
    openHours?: string;
}

export const mockStoreRequests: ShopRequest[] = [
    {
        id: "1", name: "Boba Tea House", owner: "วรรณา สุขใจ", ownerEmail: "wanna@kkumail.com",
        zone: "กังสดาล", category: "คาเฟ่", status: "pending", submittedAt: "2 ชม.ที่แล้ว",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=500",
        description: "ร้านชานมไข่มุก บรรยากาศเงียบสงบ", mapsLink: "https://goo.gl/maps/example", openHours: "10:00 - 20:00"
    },
    {
        id: "2", name: "Noodle Paradise", owner: "สมศักดิ์ มานะ", ownerEmail: "somsak@kkumail.com",
        zone: "หลังมอ", category: "อาหาร", status: "pending", submittedAt: "5 ชม.ที่แล้ว",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=500",
        description: "ก๋วยเตี๋ยวต้มยำสูตรโบราณ", mapsLink: "https://goo.gl/maps/example", openHours: "08:00 - 17:00"
    },
    {
        id: "3", name: "Green Salad Bar", owner: "นภา รักษ์โลก", ownerEmail: "napa@kkumail.com",
        zone: "ฝั่งบึง", category: "สุขภาพ", status: "approved", submittedAt: "1 วันที่แล้ว",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500",
        description: "สลัดบาร์เพื่อสุขภาพ", mapsLink: "https://goo.gl/maps/example", openHours: "07:00 - 21:00"
    },
];