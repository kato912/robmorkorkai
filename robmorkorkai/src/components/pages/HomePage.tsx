import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeMobileView from "../home/HomeMobileView";
import HomeDesktopView from "../home/HomeDesktopView";

import { ZONES as zones, CATEGORIES as categories, MOCK_SHOPS as shops, type Shop } from "../../data/mockDatat";

export interface HomeViewProps {
    selectedZone: string | null; 
    setSelectedZone: (id: string | null) => void; 
    selectedCategory: string | null; 
    setSelectedCategory: (id: string | null) => void; 
    filteredShops: Shop[];
    zones: typeof zones;
    categories: typeof categories;
    openHours?: string;
    reviewCount?: number;
    
    // Search Props
    searchQuery: string;
    setSearchQuery: (text: string) => void;
    handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedZone, setSelectedZone] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const filteredShops = shops.filter((shop) => {
        // 1. กรองโซน (เทียบ shop.zoneId กับ selectedZone)
        const matchZone = (selectedZone && selectedZone !== "all")
            ? shop.zoneId === selectedZone
            : true;

        // 2. กรองหมวดหมู่ (เทียบ shop.category กับ selectedCategory)
        const matchCategory = (selectedCategory && selectedCategory !== "all")
            ? shop.category === selectedCategory
            : true;

        return matchZone && matchCategory;
    });

    const viewProps: HomeViewProps = {
        selectedZone,
        setSelectedZone,
        selectedCategory,
        setSelectedCategory,
        filteredShops,
        zones,       
        categories,  
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