/**
 * SearchFilterSidebar Component
 *
 * Desktop filter sidebar with sticky positioning.
 * Only visible on screens 992px and wider (lg breakpoint).
 * Features:
 * - Zone filter section with "All zones" button and individual zone buttons
 * - Category filter section with selectable category buttons
 * - Clear filters button to reset all selections
 * - Sticky positioning that follows user scroll (except when at top)
 * - Zone count display (optional - shows number of shops per zone)
 * - Visual feedback for selected filters with active styling
 *
 * Props:
 * - selectedZone: Currently selected zone ID (or null for all zones)
 * - setSelectedZone: Callback to update selected zone
 * - selectedCategory: Currently selected category ID (or null for all categories)
 * - setSelectedCategory: Callback to update selected category
 * - selectedFacilities: Array of selected facilities (currently unused)
 * - toggleFacility: Callback to toggle facility (currently unused)
 * - clearFilters: Callback to clear all filters and search
 * - zonesWithCount: Array of zones with count of matching shops
 * - categoriesWithCount: Array of categories with count of matching shops
 *
 * CSS Classes Used:
 * - search-filter-sidebar: Main sidebar container with sticky positioning
 * - filter-header: Title and clear button row
 * - filter-zone-section: Zone filter group
 * - filter-category-section: Category filter group
 * - filter-label: Section header labels
 * - filter-zone-buttons: Container for zone buttons
 * - filter-zone-btn: Individual zone button styling
 * - filter-category-buttons: Container for category buttons
 * - filter-category-btn: Individual category button styling
 */

import React from "react";
import { MapPin } from "lucide-react";
import { ZONES, CATEGORIES } from "../../utils/constants";
import "./css/SearchFilterSidebar.css";

interface Props {
    selectedZone: string | null;
    setSelectedZone: (val: string | null) => void;
    selectedCategory: string | null;
    setSelectedCategory: (val: string | null) => void;
    selectedFacilities: string[];
    toggleFacility: (id: string) => void;
    clearFilters: () => void;
    zonesWithCount?: Array<{ id: string; label: string; labelEn?: string; count?: number }>;
    categoriesWithCount?: Array<{ id: string; label: string; icon?: any; count?: number }>;
}

export const SearchFilterSidebar: React.FC<Props> = ({
    selectedZone, setSelectedZone,
    selectedCategory, setSelectedCategory,
    clearFilters,
    zonesWithCount = [],
    categoriesWithCount = []
}) => {
    return (
        // Filter sidebar - sticky panel visible on desktop (lg and up)
        <div className="search-filter-sidebar">
            {/* Header with title and clear button */}
            <div className="filter-header">
                <h5 className="filter-title">ตัวกรอง</h5>
                <button onClick={clearFilters} className="filter-clear-btn">ล้างค่า</button>
            </div>

            {/* Zone filter section */}
            <div className="filter-zone-section">
                <label className="filter-label">โซน (Zone)</label>
                <div className="filter-zone-buttons">
                    {/* "All zones" button */}
                    <button
                        onClick={() => setSelectedZone(null)}
                        className={`btn filter-zone-btn rounded-4 transition-all ${selectedZone === null ? 'filter-zone-btn-active' : 'filter-zone-btn-inactive'}`}>
                        <div className="filter-zone-btn-content">
                            <MapPin size={18} className="filter-zone-btn-icon" />
                            <span>ทั้งหมด</span>
                        </div>
                    </button>

                    {/* Individual zone buttons */}
                    {zonesWithCount && zonesWithCount.map(z => {
                        const isSelected = selectedZone === z.id;
                        return (
                            <button
                                key={z.id}
                                onClick={() => setSelectedZone(isSelected ? null : z.id)}
                                className={`btn filter-zone-btn rounded-4 transition-all ${isSelected ? 'filter-zone-btn-active' : 'filter-zone-btn-inactive'}`}>
                                <div className="filter-zone-btn-content">
                                    <MapPin size={18} className="filter-zone-btn-icon" />
                                    <span>{z.label}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Category filter section */}
            <div className="filter-category-section">
                <label className="filter-label">หมวดหมู่ (Category)</label>
                <div className="filter-category-buttons">
                    {/* Individual category buttons */}
                    {(categoriesWithCount.length > 0 ? categoriesWithCount : CATEGORIES).map(c => {
                        const isSelected = selectedCategory === c.id;
                        const Icon = c.icon; // ดึง Icon ออกมา
                        return (
                            <button key={c.id} onClick={() => setSelectedCategory(isSelected ? null : c.id)}
                                className={`btn btn-sm filter-category-btn rounded-pill py-2 px-3 transition-all d-flex align-items-center gap-2 ${!isSelected ? 'filter-category-btn-inactive' : 'filter-category-btn-active'}`}
                                style={{
                                    fontSize: '0.85rem',
                                    height: '36px',
                                    ...(isSelected
                                        ? { backgroundColor: '#A73B24', opacity: 15, color: '#e8b94a', fontWeight: 'bold', border: `1px solid #c9943a` }
                                        : { backgroundColor: '#2d2320', color: '#c9943a', border: '1px solid #3d302a' })
                                }}>
                                {Icon && <Icon size={16} />}
                                <span>{c.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};