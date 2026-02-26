import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Search, Star, ArrowUpAz } from "lucide-react";

// Components
import { TopNavbar } from "../layout/TopNavbar";
import { BottomNav } from "../layout/BottomNav";
import { SearchShopCard } from "../search/SearchShopCard";
import { SearchFilterSidebar } from "../search/SearchFilterSidebar";
import { MobileSearchHeader } from "../search/MobileSearchHeader"; 

// Data
import { MOCK_SHOPS } from "../../data/mockDatat";

type SortOption = "rating" | "reviews" | "name";

export const SearchPage: React.FC = () => {
    const location = useLocation();
    const startQuery = location.state?.startQuery || "";
    const [searchQuery, setSearchQuery] = useState(startQuery);
    const [selectedZone, setSelectedZone] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<SortOption>("rating");

    const filteredShops = useMemo(() => {
        let results = MOCK_SHOPS.filter((shop) => {
            const matchesZone = selectedZone === "all" || shop.zoneId === selectedZone;
            const matchesCategory = selectedCategory === "all" || shop.category === selectedCategory;
            const matchesFacilities = selectedFacilities.length === 0 ||
                selectedFacilities.every(f => shop.facilities.includes(f));
            const matchesSearch = searchQuery.trim() === "" ||
                shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                shop.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                shop.zone.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesZone && matchesCategory && matchesFacilities && matchesSearch;
        });

        results.sort((a, b) => {
            switch (sortBy) {
                case "rating": return b.rating - a.rating;
                case "reviews": return b.reviewCount - a.reviewCount;
                case "name": return a.name.localeCompare(b.name);
                default: return 0;
            }
        });

        return results;
    }, [searchQuery, selectedZone, selectedCategory, selectedFacilities, sortBy]);

    const toggleFacility = (id: string) => {
        setSelectedFacilities(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };

    const clearFilters = () => {
        setSelectedZone("all");
        setSelectedCategory("all");
        setSelectedFacilities([]);
        setSearchQuery("");
    };

    const SortButton = ({ type, label, icon: Icon }: { type: SortOption, label: string, icon?: any }) => (
        <button
            onClick={() => setSortBy(type)}
            className={`btn btn-sm rounded-pill text-nowrap px-3 transition d-flex align-items-center gap-1`}
            style={{
                backgroundColor: sortBy === type ? '#A73B24' : '#231c18',
                color: sortBy === type ? '#f5ebe4' : '#9a8a7e',
                border: `1px solid ${sortBy === type ? '#A73B24' : '#3d302a'}`
            }}
        >
            {Icon && <Icon size={14} />} {label}
        </button>
    );

    return (
        <div className="min-vh-100 pb-5" style={{ backgroundColor: '#1a1412' }}>

            <div className="d-none d-lg-block">
                <TopNavbar
                    activePage="search"
                    showSearchBar={true}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={() => { }}
                />
            </div>

            <MobileSearchHeader 
                searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                selectedZone={selectedZone} setSelectedZone={setSelectedZone}
                selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                selectedFacilities={selectedFacilities} 
                toggleFacility={toggleFacility}
                clearFilters={clearFilters}
            />

            <div className="container py-4">
                <div className="row g-4">
                    <div className="col-lg-3 d-none d-lg-block">
                        <SearchFilterSidebar
                            selectedZone={selectedZone} setSelectedZone={setSelectedZone}
                            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                            selectedFacilities={selectedFacilities} toggleFacility={toggleFacility}
                            clearFilters={clearFilters}
                        />
                    </div>

                    <div className="col-lg-9">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                            <div className="mb-3 mb-md-0">
                                <h4 className="fw-bold m-0 d-none d-lg-block" style={{ color: '#f5ebe4' }}>ร้านทั้งหมด</h4>
                                <h5 className="fw-bold m-0 d-lg-none" style={{ color: '#f5ebe4' }}>ร้านทั้งหมด</h5>
                                <small style={{ color: '#9a8a7e' }}>พบ {filteredShops.length} ร้าน</small>
                            </div>

                            <div className="d-flex align-items-center gap-2 overflow-auto no-scrollbar pb-1">
                                <span className="small text-nowrap d-none d-md-inline me-1" style={{ color: '#8a7b72' }}>เรียงตาม:</span>
                                <SortButton type="rating" label="คะแนนสูงสุด" icon={Star} />
                                <SortButton type="reviews" label="รีวิวมากสุด" />
                                <SortButton type="name" label="ชื่อ ก-ฮ" icon={ArrowUpAz} />
                            </div>
                        </div>

                        <div className="row g-3">
                            {filteredShops.map(shop => (
                                <div className="col-12" key={shop.id}>
                                    <SearchShopCard shop={shop} />
                                </div>
                            ))}
                        </div>

                        {filteredShops.length === 0 && (
                            <div className="text-center py-5">
                                <div className="rounded-circle p-3 d-inline-block shadow-sm mb-3" style={{ backgroundColor: '#2d2320' }}>
                                    <Search size={24} className="opacity-50" style={{ color: '#8a7b72' }} />
                                </div>
                                <p className="mb-2" style={{ color: '#9a8a7e' }}>ไม่พบร้านที่คุณค้นหา</p>
                                <button onClick={clearFilters} className="btn btn-sm rounded-pill px-3" style={{ border: '1px solid #A73B24', color: '#A73B24', backgroundColor: 'transparent' }}>ล้างตัวกรอง</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="d-lg-none"><BottomNav activePage="search" /></div>
        </div>
    );
};