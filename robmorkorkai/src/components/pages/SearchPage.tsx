import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, Star, ArrowUpAz, Loader2 } from "lucide-react";

// Components
import { TopNavbar } from "../layout/TopNavbar";
import { BottomNav } from "../layout/BottomNav";
import { SearchShopCard } from "../search/SearchShopCard";
import { SearchFilterSidebar } from "../search/SearchFilterSidebar";
import { MobileSearchHeader } from "../search/MobileSearchHeader"; 

// Types & Constants
import type { Shop } from "../../types/shop";
import { ZONES as zones, CATEGORIES } from "../../utils/constants";

// Helper Functions
const cleanText = (text: string): string => {
    if (!text) return "";
    return text
        .normalize("NFD")
        .replace(/[\u0E31\u0E33\u0E34-\u0E3A\u0E47-\u0E4E]/g, "")
        .toLowerCase()
        .trim();
};

const ZONE_ID_MAP: Record<string, string[]> = {
    "lang-mor": ["หลังมอ"],
    "nai-mor": ["ในมอ"],
    "muang": ["เมือง"],
    "khlong-san": ["คลองซัน"],
};

type SortOption = "rating" | "reviews" | "name";

export const SearchPage: React.FC = () => {
    const location = useLocation();
    const startQuery = location.state?.startQuery || "";
    const [searchQuery, setSearchQuery] = useState(startQuery);
    const [selectedZone, setSelectedZone] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<SortOption>("rating");
    const [shops, setShops] = useState<Shop[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // ดึงข้อมูลร้านจาก API
    useEffect(() => {
        const fetchShops = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("http://localhost:3000/api/shops?limit=1000");
                if (!response.ok) throw new Error("Failed to fetch shops");
                const data = await response.json();
                setShops(data);
            } catch (error) {
                console.error("Error fetching shops:", error);
                setShops([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchShops();
    }, []);

    // คำนวณจำนวนร้านต่อโซน
    const zonesWithCount = useMemo(() => {
        return zones.map(z => {
            const count = shops.filter(shop => {
                const shopZone = shop.zone || "";
                const zoneId = z.id;
                const zoneLabel = z.label.replace('📍', '').trim();

                // Logic 1: ตรวจสอบ ID ตรง
                if (cleanText(shopZone) === cleanText(zoneId)) return true;

                // Logic 2: ตรวจสอบ Label ตรง
                if (cleanText(shopZone) === cleanText(zoneLabel)) return true;

                // Logic 3: ตรวจสอบ Manual Map
                const mappedLabels = ZONE_ID_MAP[zoneId] || [];
                if (mappedLabels.some(label => cleanText(shopZone) === cleanText(label))) {
                    return true;
                }

                // Logic 4: เทียบ cleanText
                const cleanShopZone = cleanText(shopZone);
                const cleanZoneId = cleanText(zoneId);
                const cleanZoneLabel = cleanText(zoneLabel);

                return cleanShopZone === cleanZoneId ||
                    cleanShopZone === cleanZoneLabel ||
                    cleanShopZone.includes(cleanZoneId) ||
                    cleanZoneId.includes(cleanShopZone);
            }).length;
            return { ...z, count };
        });
    }, [shops]);

    const filteredShops = useMemo(() => {
        let results = shops.filter((shop) => {
            // ค้นหาตามคำค้น (ชื่อร้าน, หมวดหมู่, โซน, คำอธิบาย)
            const query = searchQuery.trim().toLowerCase();
            const matchesSearch = !query ||
                shop.name?.toLowerCase().includes(query) ||
                shop.category?.toLowerCase().includes(query) ||
                shop.zone?.toLowerCase().includes(query) ||
                (shop.description && shop.description.toLowerCase().includes(query));

            // กรองตามโซน
            const matchesZone = selectedZone === null || 
                shop.zone?.toLowerCase().includes(selectedZone.toLowerCase());

            // กรองตามหมวดหมู่ (ใช้ shop.type เหมือน useShops)
            let matchesCategory = true;
            if (selectedCategory && selectedCategory !== null) {
                const dbType = (shop.type || shop.category || "").toLowerCase();
                const uiCategory = selectedCategory.toLowerCase();
                matchesCategory = dbType.includes(uiCategory);
            }

            return matchesSearch && matchesZone && matchesCategory;
        });

        // เรียงลำดับ
        results.sort((a, b) => {
            switch (sortBy) {
                case "rating": return (b.ratingAvg || 0) - (a.ratingAvg || 0);
                case "reviews": return (b.reviewCount || 0) - (a.reviewCount || 0);
                case "name": return a.name.localeCompare(b.name, 'th');
                default: return 0;
            }
        });

        return results;
    }, [shops, searchQuery, selectedZone, selectedCategory, sortBy]);

    // คำนวณจำนวนร้านต่อหมวดหมู่ (optional - สำหรับอิสระในอนาคต)
    const categoriesWithCount = useMemo(() => {
        return CATEGORIES.map(cat => {
            const count = shops.filter(shop => {
                const dbType = (shop.type || shop.category || "").toLowerCase();
                return dbType.includes(cat.id.toLowerCase());
            }).length;
            return { ...cat, count };
        });
    }, [shops]);

    const toggleFacility = (id: string) => {
        setSelectedFacilities(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };

    const clearFilters = () => {
        setSelectedZone(null);
        setSelectedCategory(null);
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
            <style>{`
                @keyframes spin {
                    100% { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                .min-vh-75 {
                    min-height: 75vh;
                }
            `}</style>

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

            {/* Loading State */}
            {isLoading ? (
                <div className="d-flex flex-column align-items-center justify-content-center min-vh-75">
                    <Loader2 size={48} className="text-warning mb-3 animate-spin" />
                    <h5 className="text-muted">กำลังโหลดข้อมูล...</h5>
                </div>
            ) : (
            <div className="container py-4">
                <div className="row g-4">
                    <div className="col-lg-3 d-none d-lg-block">
                        <SearchFilterSidebar
                            selectedZone={selectedZone} setSelectedZone={setSelectedZone}
                            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                            selectedFacilities={selectedFacilities} toggleFacility={toggleFacility}
                            clearFilters={clearFilters}
                            zonesWithCount={zonesWithCount}
                            categoriesWithCount={categoriesWithCount}
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
            )}

            <div className="d-lg-none"><BottomNav activePage="search" /></div>
        </div>
    );
};