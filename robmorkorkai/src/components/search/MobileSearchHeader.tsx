/**
 * MobileSearchHeader Component
 *
 * Mobile-exclusive search header with sticky positioning.
 * Features:
 * - Search input field with search icon placeholder
 * - Home icon link in top-left
 * - Filter toggle button that opens/closes collapsible filter panel
 * - Collapsible filter panel with zone and category filters
 * - Scroll indicator bar showing zone filters when user scrolls
 * - Responsive design optimized for mobile devices
 *
 * Props:
 * - searchQuery: Current search query string
 * - setSearchQuery: Callback to update search query
 * - selectedZone: Currently selected zone (or null for all zones)
 * - setSelectedZone: Callback to update selected zone
 * - selectedCategory: Currently selected category (or null for all categories)
 * - setSelectedCategory: Callback to update selected category
 * - selectedFacilities: Array of selected facilities
 * - toggleFacility: Callback to toggle facility selection
 * - clearFilters: Callback to clear all filters and search
 *
 * CSS Classes Used:
 * - mobile-search-header: Main header container with sticky positioning
 * - mobile-search-header-content: Row containing home icon, search input, filter toggle
 * - mobile-search-input: Search input field with rounded corners
 * - mobile-filter-panel: Collapsible panel with zone/category filters (animated slide-down)
 * - mobile-filter-buttons: Container for filter button groups
 * - mobile-scroll-indicator-bar: Sticky zone filter bar shown when user scrolls (below header)
 */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Home, X, SlidersHorizontal, MapPin, Coffee } from "lucide-react";
import { ZONES, CATEGORIES } from "../../utils/constants";
import "./css/MobileSearchHeader.css";

interface Props {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    selectedZone: string | null;
    setSelectedZone: (val: string | null) => void;
    selectedCategory: string | null;
    setSelectedCategory: (val: string | null) => void;
    selectedFacilities: string[];
    toggleFacility: (id: string) => void;
    clearFilters: () => void;
}

export const MobileSearchHeader: React.FC<Props> = ({
    searchQuery, setSearchQuery,
    selectedZone, setSelectedZone,
    selectedCategory, setSelectedCategory,
    selectedFacilities, toggleFacility, 
    clearFilters
}) => {
    const [showFilters, setShowFilters] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Track scroll position to show/hide scroll indicator bar
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        // Mobile header - sticky to top with search and filter toggle
        <div className="d-lg-none sticky-top shadow-sm transition mobile-search-header">
            {/* Search input and filter button row */}
            <div className="mobile-search-header-content">
                {/* Home icon link */}
                <Link to="/" className="mobile-search-home-link"><Home size={24} strokeWidth={2} /></Link>
                
                {/* Search input with icon */}
                <div className="mobile-search-input-wrapper position-relative flex-grow-1">
                    <Search className="mobile-search-icon" size={18} />
                    <input 
                        className="form-control mobile-search-input rounded-4 border-0 ps-5 shadow-none" 
                        placeholder="ค้นหา..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                </div>
                
                {/* Filter toggle button */}
                <button 
                    className={`btn mobile-filter-toggle transition shadow-sm ${showFilters ? 'mobile-filter-toggle-active' : 'mobile-filter-toggle-inactive'}`}
                    onClick={() => setShowFilters(!showFilters)}
                    title="Toggle filters"
                >
                    {showFilters ? <X size={20} /> : <SlidersHorizontal size={20} />}
                </button>
            </div>

            {/* Collapsible filter panel */}
            {showFilters && (
                <div className="mobile-filter-panel">
                    {/* Zone filter section */}
                    <div className="mobile-filter-section">
                        <small className="mobile-filter-label">โซน</small>
                        <div className="mobile-filter-buttons">
                            {/* "All zones" button */}
                            <button onClick={() => setSelectedZone(null)} 
                                className={`btn btn-sm mobile-filter-btn rounded-pill px-3 ${selectedZone === null ? 'mobile-filter-btn-active' : 'mobile-filter-btn-inactive'}`}>
                                ทั้งหมด
                            </button>
                            {/* Individual zone buttons */}
                            {ZONES.map(z => (
                                <button key={z.id} onClick={() => setSelectedZone(selectedZone === z.id ? null : z.id)} 
                                    className={`btn btn-sm mobile-filter-btn rounded-pill px-3 ${selectedZone === z.id ? 'mobile-filter-btn-active' : 'mobile-filter-btn-inactive'}`}>
                                    {z.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category filter section */}
                    <div className="mobile-filter-section">
                        <small className="mobile-filter-label">หมวดหมู่</small>
                        <div className="mobile-filter-buttons">
                            {/* Individual category buttons */}
                            {CATEGORIES.map(c => {
                                const Icon = c.icon || Coffee;
                                return (
                                    <button key={c.id} onClick={() => setSelectedCategory(selectedCategory === c.id ? null : c.id)} 
                                        className={`btn btn-sm mobile-filter-btn rounded-pill px-3 d-flex gap-1 align-items-center ${selectedCategory === c.id ? 'mobile-filter-btn-active' : 'mobile-filter-btn-inactive'}`}>
                                        <Icon size={14} /> {c.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Clear filters button if any filters are active */}
                    {(selectedZone !== null || selectedCategory !== null || selectedFacilities.length > 0) && (
                        <div className="mobile-clear-filters-divider">
                            <button onClick={clearFilters} className="btn btn-link mobile-clear-filters-btn p-0 small text-decoration-none">ล้างตัวกรองทั้งหมด</button>
                        </div>
                    )}
                </div>
            )}

            {/* Scrolled state - shows zone filters as user scrolls */}
            <div className="mobile-scroll-indicator-bar" style={{ maxHeight: (isScrolled && !showFilters) ? '60px' : '0px', opacity: (isScrolled && !showFilters) ? 1 : 0 }}>
                <span className="mobile-scroll-zone-label"><MapPin size={12} /> โซน:</span>
                {/* "All" zone button */}
                <button onClick={() => setSelectedZone(null)} 
                    className={`btn btn-sm mobile-filter-btn rounded-pill text-nowrap px-3 ${selectedZone === null ? 'mobile-filter-btn-active' : 'mobile-filter-btn-inactive'}`}>
                    ทั้งหมด
                </button>
                {/* Zone buttons in scroll bar */}
                {ZONES.map(z => (
                    <button key={z.id} onClick={() => setSelectedZone(selectedZone === z.id ? null : z.id)} 
                        className={`btn btn-sm mobile-filter-btn rounded-pill text-nowrap px-3 ${selectedZone === z.id ? 'mobile-filter-btn-active' : 'mobile-filter-btn-inactive'}`}>
                        {z.label}
                    </button>
                ))}
            </div>
        </div>
    );
};