import { Utensils, Coffee, Store, Beer } from "lucide-react";

export const ZONES = [
    { id: "หลังมอ", label: "หลังมอ", labelEn: "Lang Mo" },
    { id: "กังสดาล", label: "กังสดาล", labelEn: "Kangsadal" },
    { id: "โคลัมโบ", label: "โคลัมโบ", labelEn: "Columbo" },
    { id: "ในมอ", label: "ในมอ", labelEn: "KKU" }
];

export const CATEGORIES = [
    { id: "restaurant", label: "ร้านอาหาร", icon: Utensils },
    { id: "cafe", label: "คาเฟ่/ของหวาน", icon: Coffee },
    { id: "food", label: "สตรีทฟู้ด", icon: Store },
    { id: "bar", label: "บาร์/กลางคืน", icon: Beer }
];