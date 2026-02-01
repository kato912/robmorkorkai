import React, { useState, useMemo } from "react"; // ❌ ไม่ต้องใช้ useEffect แล้ว เพราะย้ายไปอยู่ใน MobileHeader แล้ว
import { useLocation } from "react-router-dom";
import { Search, Star, ArrowUpAz } from "lucide-react";

// Components
import { TopNavbar } from "../layout/TopNavbar";
import { BottomNav } from "../layout/BottomNav";
import { SearchShopCard } from "../search/SearchShopCard";
import { SearchFilterSidebar } from "../search/SearchFilterSidebar";
import { MobileSearchHeader } from "../search/MobileSearchHeader"; // ✅ Import มาใหม่

// Data
import { MOCK_SHOPS } from "../../data/mockDatat";

type SortOption = "rating" | "reviews" | "name";

interface SearchPageProps {
    isLoggedIn: boolean;
}

export const SearchPage: React.FC<SearchPageProps> = ({ isLoggedIn }) => {
    // --- State ---
    const location = useLocation();
    const startQuery = location.state?.startQuery || "";

    const [searchQuery, setSearchQuery] = useState(startQuery);
    const [selectedZone, setSelectedZone] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<SortOption>("rating");

    // ❌ ลบ State showMobileFilters และ isScrolled ออกไปได้เลย (ย้ายไปอยู่ใน MobileSearchHeader แล้ว)

    // --- Logic: Filtering ---
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

    // --- Handlers ---
    const toggleFacility = (id: string) => {
        setSelectedFacilities(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };

    const clearFilters = () => {
        setSelectedZone("all");
        setSelectedCategory("all");
        setSelectedFacilities([]);
        setSearchQuery("");
    };

    // --- Helper UI ---
    const SortButton = ({ type, label, icon: Icon }: { type: SortOption, label: string, icon?: any }) => (
        <button
            onClick={() => setSortBy(type)}
            className={`btn btn-sm rounded-pill text-nowrap px-3 border transition d-flex align-items-center gap-1 
            ${sortBy === type ? 'btn-dark text-white shadow-sm' : 'btn-white text-secondary hover-bg-light'}`}
        >
            {Icon && <Icon size={14} />} {label}
        </button>
    );

    return (
        <div className="bg-light min-vh-100 pb-5">

            {/* ✅ Desktop Header */}
            <div className="d-none d-lg-block">
                <TopNavbar
                    activePage="search"
                    isLoggedIn={isLoggedIn}
                    showSearchBar={true}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={() => { }}
                />
            </div>

            {/* ✅ Mobile Header (Component ใหม่) */}
            <MobileSearchHeader 
                searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                selectedZone={selectedZone} setSelectedZone={setSelectedZone}
                selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                selectedFacilities={selectedFacilities} 
                toggleFacility={toggleFacility}
                clearFilters={clearFilters}
            />

            {/* ✅ Main Content */}
            <div className="container py-4">
                <div className="row g-4">
                    {/* Sidebar (Desktop) */}
                    <div className="col-lg-3 d-none d-lg-block">
                        <SearchFilterSidebar
                            selectedZone={selectedZone} setSelectedZone={setSelectedZone}
                            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                            selectedFacilities={selectedFacilities} toggleFacility={toggleFacility}
                            clearFilters={clearFilters}
                        />
                    </div>

                    {/* Results */}
                    <div className="col-lg-9">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                            <div className="mb-3 mb-md-0">
                                <h4 className="fw-bold m-0 d-none d-lg-block">ร้านทั้งหมด</h4>
                                <h5 className="fw-bold m-0 d-lg-none">ร้านทั้งหมด</h5>
                                <small className="te xt-secondary">พบ {filteredShops.length} ร้าน</small>
                            </div>

                            <div className="d-flex align-items-center gap-2 overflow-auto no-scrollbar pb-1">
                                <span className="text-secondary small text-nowrap d-none d-md-inline me-1">เรียงตาม:</span>
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
                                <div className="bg-white rounded-circle p-3 d-inline-block shadow-sm mb-3">
                                    <Search size={24} className="text-secondary opacity-50" />
                                </div>
                                <p className="text-muted mb-2">ไม่พบร้านที่คุณค้นหา</p>
                                <button onClick={clearFilters} className="btn btn-outline-primary btn-sm rounded-pill px-3">ล้างตัวกรอง</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="d-lg-none"><BottomNav activePage="search" isLoggedIn={isLoggedIn} /></div>
        </div>
    );
};