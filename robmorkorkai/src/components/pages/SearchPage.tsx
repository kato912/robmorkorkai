import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, Star, ArrowUpAz, Loader2 } from "lucide-react";

// Components
import { TopNavbar } from "../layout/TopNavbar";
import { BottomNav } from "../layout/BottomNav";
import { SearchShopCard } from "../search/SearchShopCard";
import { SearchFilterSidebar } from "../search/SearchFilterSidebar";
import { MobileSearchHeader } from "../search/MobileSearchHeader";
import "./css/SearchPage.css";

// Types & Constants
import type { Shop } from "../../types/shop";
import { ZONES as zones, CATEGORIES } from "../../utils/constants";

const API_BASE = import.meta.env.VITE_API_URL;

// Helper Functions
/**
 * Clean Thai text for comparison by removing tone marks and diacritics
 * Normalizes text to NFD form and removes Thai combining characters
 */
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

/**
 * SearchPage Component
 *
 * Main search results page with filtering and sorting functionality.
 * Features:
 * - Search query filtering by shop name, category, zone, description
 * - Zone-based filtering with intelligent zone mapping
 * - Category-based filtering using shop.type field
 * - Sort options: rating (descending), reviews (descending), name (alphabetical Thai)
 * - Responsive design with desktop sidebar filters and mobile collapsible filters
 * - Loading state with spinner while fetching shops
 * - Empty state message when no results found
 * - Dynamic zone and category counts
 *
 * State:
 * - searchQuery: User's search text input
 * - selectedZone: Currently selected zone (or null for all)
 * - selectedCategory: Currently selected category (or null for all)
 * - selectedFacilities: Array of selected facilities
 * - sortBy: Current sort option (rating, reviews, or name)
 * - shops: All shops fetched from API
 * - isLoading: Loading state during API fetch
 *
 * Computed Values:
 * - zonesWithCount: Zones with count of matching shops
 * - filteredShops: Final filtered and sorted results
 * - categoriesWithCount: Categories with count of matching shops
 */

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

    // Fetch all shops from API on component mount
    useEffect(() => {
        const fetchShops = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${API_BASE}/api/shops?limit=1000`);
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

    // Calculate zone counts - for each zone, count how many shops belong to it
    // Uses intelligent zone matching to handle various data format inconsistencies
    const zonesWithCount = useMemo(() => {
        return zones.map(z => {
            const count = shops.filter(shop => {
                const shopZone = shop.zone || "";
                const zoneId = z.id;
                const zoneLabel = z.label.replace('📍', '').trim();

                // 4-tier matching strategy to handle different data formats:
                // This accounts for API data variations (uppercase/lowercase, tone marks, spaces)

                // Logic 1: Direct ID match (cleanText removes tone marks and normalizes)
                if (cleanText(shopZone) === cleanText(zoneId)) return true;

                // Logic 2: Match against zone label (from constants)
                if (cleanText(shopZone) === cleanText(zoneLabel)) return true;

                // Logic 3: Use manual mapping dictionary for known aliases
                // e.g., "lang-mor" -> ["หลังมอ"] handles API inconsistencies
                const mappedLabels = ZONE_ID_MAP[zoneId] || [];
                if (mappedLabels.some(label => cleanText(shopZone) === cleanText(label))) {
                    return true;
                }

                // Logic 4: Substring matching after text cleaning
                // Catches partial matches and typos in zone names
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
            // Search filter - matches against shop name, category, zone, and description
            const query = searchQuery.trim().toLowerCase();
            const matchesSearch = !query ||
                shop.name?.toLowerCase().includes(query) ||
                shop.category?.toLowerCase().includes(query) ||
                shop.zone?.toLowerCase().includes(query) ||
                (shop.description && shop.description.toLowerCase().includes(query));

            // Zone filter - if zone selected, only show shops in that zone
            const matchesZone = selectedZone === null ||
                shop.zone?.toLowerCase().includes(selectedZone.toLowerCase());

            // Category filter - uses shop.type field (fallback to shop.category)
            let matchesCategory = true;
            if (selectedCategory && selectedCategory !== null) {
                const dbType = (shop.type || shop.category || "").toLowerCase();
                const uiCategory = selectedCategory.toLowerCase();
                matchesCategory = dbType.includes(uiCategory);
            }

            return matchesSearch && matchesZone && matchesCategory;
        });

        // Sort results based on selected sort option
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

    // Calculate category counts - for each category, count how many shops have that category
    // Uses shop.type field preferentially, falls back to shop.category if type is empty
    // This ensures accurate count display for category filter buttons
    const categoriesWithCount = useMemo(() => {
        return CATEGORIES.map(cat => {
            const count = shops.filter(shop => {
                // Get category from shop.type (primary) or shop.category (fallback)
                const dbType = (shop.type || shop.category || "").toLowerCase();
                // Check if shop's category includes the filter category ID
                return dbType.includes(cat.id.toLowerCase());
            }).length;
            // Return category object with appended count property
            return { ...cat, count };
        });
    }, [shops]);

    // Toggle facility selection (currently unused but available for future expansion)
    const toggleFacility = (id: string) => {
        setSelectedFacilities(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };

    // Reset all filters and search query to initial state (shows all shops)
    const clearFilters = () => {
        setSelectedZone(null);
        setSelectedCategory(null);
        setSelectedFacilities([]);
        setSearchQuery("");
    };

    // SortButton - Reusable button component for sort options
    // Displays sort type with optional icon and highlights active sort selection
    const SortButton = ({ type, label, icon: Icon }: { type: SortOption, label: string, icon?: any }) => (
        <button
            onClick={() => setSortBy(type)}
            className={`btn btn-sm search-sort-btn rounded-pill text-nowrap px-3 transition d-flex align-items-center gap-1 ${sortBy === type ? 'search-sort-btn-active' : 'search-sort-btn-inactive'}`}
        >
            {Icon && <Icon size={14} />} {label}
        </button>
    );

    return (
        // Main search page container with dark theme
        <div className="search-page-container">
            {/* Desktop Navigation - Only visible on large screens */}
            <div className="d-none d-lg-block">
                <TopNavbar
                    activePage="search"
                    showSearchBar={true}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={() => { }}
                />
            </div>

            {/* Mobile Search Header - Only visible on small/medium screens */}
            <MobileSearchHeader
                searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                selectedZone={selectedZone} setSelectedZone={setSelectedZone}
                selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                selectedFacilities={selectedFacilities}
                toggleFacility={toggleFacility}
                clearFilters={clearFilters}
            />

            {/* Loading State - Shows spinner while fetching shops */}
            {isLoading ? (
                <div className="search-loading-container">
                    <Loader2 size={48} className="search-loading-spinner" />
                    <h5 className="search-loading-message">กำลังโหลดข้อมูล...</h5>
                </div>
            ) : (
                <div className="container search-page-content">
                    <div className="row g-4">
                        {/* Filter Sidebar - Desktop only (col-lg-3) */}
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

                        {/* Results Section - Desktop and mobile (col-lg-9, col-12) */}
                        <div className="col-lg-9">
                            {/* Results header with title and sort controls */}
                            {/* Results header with title and sort controls */}
                            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">

                                {/* ฝั่งซ้าย: หัวข้อร้านทั้งหมด (บรรทัดบน) และจำนวนที่พบ (บรรทัดล่าง) */}
                                <div className="d-flex flex-column gap-1">
                                    <h4 className="m-0 fw-bold d-none d-lg-block" style={{ color: '#f5ebe4' }}>ร้านทั้งหมด</h4>
                                    <h5 className="m-0 fw-bold d-lg-none" style={{ color: '#f5ebe4' }}>ร้านทั้งหมด</h5>
                                    <span style={{ color: '#9a8a7e', fontSize: '0.95rem' }}>พบ {filteredShops.length} ร้าน</span>
                                </div>

                                {/* ฝั่งขวา: กลุ่มปุ่มจัดเรียง (ดันไปชิดขวาสุด) */}
                                <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end">
                                    <span className="d-none d-md-inline me-1" style={{ color: '#d7cec7', fontSize: '0.9rem' }}>เรียงตาม:</span>
                                    <SortButton type="rating" label="คะแนนสูงสุด" icon={Star} />
                                    <SortButton type="reviews" label="รีวิวมากสุด" />
                                    <SortButton type="name" label="ชื่อ ก-ฮ" icon={ArrowUpAz} />
                                </div>

                            </div>

                            {/* Results Grid - Vertical list of shop cards */}
                            <div className="search-results-grid">
                                {filteredShops.map(shop => (
                                    <div key={shop.id}>
                                        <SearchShopCard shop={shop} />
                                    </div>
                                ))}
                            </div>

                            {/* Empty State - No results found */}
                            {filteredShops.length === 0 && (
                                <div className="search-empty-state">
                                    <div className="search-empty-state-icon">
                                        <Search size={24} className="search-empty-state-icon-svg" />
                                    </div>
                                    <p className="search-empty-message">ไม่พบร้านที่คุณค้นหา</p>
                                    <button onClick={clearFilters} className="btn btn-sm search-clear-filters-btn">ล้างตัวกรอง</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Bottom Navigation */}
            <div className="d-lg-none"><BottomNav activePage="search" /></div>
        </div>
    );
};