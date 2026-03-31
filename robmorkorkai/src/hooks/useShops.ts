import { useState, useEffect, useMemo } from "react";
import type { Shop } from "../types/shop";

const API_BASE = import.meta.env.VITE_API_URL;

export const useShops = () => {
    // State สำหรับ API
    const [shops, setShops] = useState<Shop[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // State สำหรับ Filter & Search
    const [selectedZone, setSelectedZone] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // ยิง API ดึงข้อมูล
    useEffect(() => {
        const fetchShops = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const response = await fetch(`${API_BASE}/api/shops`);
                if (!response.ok) throw new Error("ดึงข้อมูลร้านค้าไม่สำเร็จ");

                const data = await response.json();
                setShops(data);
            } catch (err: any) {
                console.error("Fetch Error:", err);
                setError(err.message || "เกิดข้อผิดพลาดในการดึงข้อมูล");
            } finally {
                setIsLoading(false);
            }
        };

        fetchShops();
    }, []);

    // ฟังก์ชันกรองข้อมูล (Filter Logic)
    const filteredShops = useMemo(() => {
        return shops.filter((shop) => {
            // กรอง Zone
            let matchZone = true;
            if (selectedZone && selectedZone !== "all") {
                const dbZone = (shop.zone || "").toLowerCase();
                const uiZone = selectedZone.toLowerCase();
                matchZone = dbZone.includes(uiZone) || uiZone.includes(dbZone);
            }

            // กรอง Category / Type
            let matchCategory = true;
            if (selectedCategory && selectedCategory !== "all") {
                const dbType = (shop.type || shop.category || "").toLowerCase();
                const uiCategory = selectedCategory.toLowerCase();
                matchCategory = dbType.includes(uiCategory);
            }

            return matchZone && matchCategory;
        });
    }, [shops, selectedZone, selectedCategory]);

    // ส่งค่าทั้งหมดออกไปให้ Component ใช้งาน
    return {
        shops,
        filteredShops,
        isLoading,
        error,
        selectedZone, setSelectedZone,
        selectedCategory, setSelectedCategory,
        searchQuery, setSearchQuery
    };
};