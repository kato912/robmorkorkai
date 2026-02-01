import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeMobileView from "../home/HomeMobileView";
import HomeDesktopView from "../home/HomeDesktopView";
import { ZONES as zones, CATEGORIES as categories, MOCK_SHOPS as shops } from "../../data/mockDatat";

export interface HomeViewProps {
    isLoggedIn: boolean; 
    selectedZone: string | null; 
    setSelectedZone: (id: string | null) => void; 
    selectedCategory: string | null; 
    setSelectedCategory: (id: string | null) => void; 
    filteredShops: any[];
    zones: typeof zones;
    categories: typeof categories;
    openTime?: string;
    reviewCount?: number;
    
    // Search Props
    searchQuery: string;
    setSearchQuery: (text: string) => void;
    handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

// ❌ ลบ zones, categories, shops ที่เคยประกาศตรงนี้ออกให้หมดครับ ❌

const HomePage: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    const [selectedZone, setSelectedZone] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // ฟังก์ชัน Search
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Logic การกรองร้านค้า (ใช้ shops ที่ import มา)
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

    const viewProps: HomeViewProps = {
        isLoggedIn,
        selectedZone,
        setSelectedZone,
        selectedCategory,
        setSelectedCategory,
        filteredShops,
        zones,       // ส่งค่าที่ import มา
        categories,  // ส่งค่าที่ import มา
        searchQuery,
        setSearchQuery,
        handleSearch
    };

    return (
        <>
            <div className="d-lg-none">
                <HomeMobileView {...viewProps} />
            </div>
            <div className="d-none d-lg-block">
                <HomeDesktopView {...viewProps} />
            </div>
        </>
    );
};

export default HomePage;