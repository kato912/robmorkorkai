import React, { useState } from "react";
import HomeMobileView from "../home/HomeMobileView";
import HomeDesktopView from "../home/HomeDesktopView";

// export to HomeDesktopView/HomeMobileView
export interface HomeViewProps {
    isLoggedIn: boolean; //check status login
    selectedZone: string | null; // check selectedzone
    setSelectedZone: (id: string | null) => void; // update if selectedzone
    selectedCategory: string | null; // check selected category
    setSelectedCategory: (id: string | null) => void; // update if selected category
    filteredShops: any[];
    zones: typeof zones;
    categories: typeof categories;
}

export const zones = [
    { id: "kangsadan", label: "กังสดาล", labelEn: "Kangsadan" },
    { id: "langmor", label: "หลังมอ", labelEn: "Lang Mor" },
    { id: "bueng", label: "ฝั่งบึง", labelEn: "Bueng Side" },
    { id: "korombo", label: "โคลัมโบ", labelEn: "korumbo" },
];

export const categories = [
    { id: "cafe", label: "คาเฟ่" },
    { id: "food", label: "อาหาร" },
    { id: "shabu", label: "ชาบู/ปิ้งย่าง" },
    { id: "coworking", label: "อ่านหนังสือ" },
    { id: "somrod", label: "ซ่อมรถ" },
    { id: "tiwtor", label: "ติวเตอร์" }
];

export const shops = [
    { id: "1", name: "Study Space Cafe", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=500", rating: 4.8, zone: "กังสดาล", category: "คาเฟ่", verified: true },
    { id: "2", name: "Midnight Brew", image: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?auto=format&fit=crop&w=500", rating: 4.5, zone: "หลังมอ", category: "คาเฟ่", verified: false },
    { id: "3", name: "Shabu King", image: "https://images.unsplash.com/photo-1574484284008-86d47dc7b905?auto=format&fit=crop&w=500", rating: 4.2, zone: "กังสดาล", category: "ชาบู/ปิ้งย่าง", verified: true },
    { id: "4", name: "Library Hub", image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=500", rating: 4.6, zone: "ฝั่งบึง", category: "อ่านหนังสือ", verified: true },
];

// ✅ 2. แก้บรรทัดนี้ให้รับ Props
const HomePage: React.FC<Props> = ({ isLoggedIn }) => {
    const [selectedZone, setSelectedZone] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Logic การกรองร้านค้า
    const filteredShops = shops.filter((shop) => {
        const matchZone = selectedZone
            ? shop.zone === zones.find((z) => z.id === selectedZone)?.label
            : true;

        const catLabel = categories.find(c => c.id === selectedCategory)?.label;
        const matchCategory = selectedCategory
            ? shop.category.includes(catLabel || "")
            : true;

        return matchZone && matchCategory;
    });

    const viewProps = {
        isLoggedIn,
        selectedZone,
        setSelectedZone,
        selectedCategory,
        setSelectedCategory,
        filteredShops,
        zones,
        categories
    };

    return (
        <>
            <div className="d-lg-none">
                {/* HomeMobileView จะได้รับ isLoggedIn ไปด้วย และเอาไปส่งต่อให้ Navbar */}
                <HomeMobileView {...viewProps} />
            </div>
            <div className="d-none d-lg-block">
                <HomeDesktopView {...viewProps} />
            </div>
        </>
    );
};

export default HomePage;