import React, { useState,useMemo } from "react";
import { useNavigate } from "react-router-dom";
import HomeMobileView from "../home/HomeMobileView";
import HomeDesktopView from "../home/HomeDesktopView";
import type { Shop } from "../../types/shop";
import { ZONES as zones, CATEGORIES as categories } from "../../data/mockData";

type HomePageProps = {
    shops: Shop[];
}

export interface HomeViewProps {
    selectedZone: string | null; 
    setSelectedZone: (id: string | null) => void; 
    selectedCategory: string | null; 
    setSelectedCategory: (id: string | null) => void; 
    filteredShops: Shop[];
    zone: typeof zones;
    categorie: typeof categories;
    openHours?: string;
    reviewCount?: number;
    
    // Search Props
    searchQuery: string;
    setSearchQuery: (text: string) => void;
    handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const HomePage = ({ shops }: HomePageProps) => {
    const navigate = useNavigate();
    const [selectedZone, setSelectedZone] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const filteredShops = useMemo(() => {
        return shops.filter((shop) => {
            const matchZone = (selectedZone && selectedZone !== "all")
                ? shop.zone === selectedZone
                : true;

            const matchCategory = (selectedCategory && selectedCategory !== "all")
                ? shop.category === selectedCategory
                : true;

            return matchZone && matchCategory;
        });
    }, [shops, selectedZone, selectedCategory]);

    const viewProps: HomeViewProps = {
        selectedZone,
        setSelectedZone,
        selectedCategory,
        setSelectedCategory,
        filteredShops,
        zone: zones,       
        categorie: categories,  
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