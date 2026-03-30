import React from "react";
import { MapPin } from "lucide-react";
import { ZONES, CATEGORIES } from "../../utils/constants";
import '../../assets/css/filterSearch.css'

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
        <div className="p-4 rounded-4 sticky-top" style={{ 
            backgroundColor: '#231c18', 
            border: '1px solid #3d302a', 
            borderTop: '3px solid #A73B24',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            top: '100px' 
        }}>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold m-0" style={{ color: '#f5ebe4' }}>ตัวกรอง</h5>
                <button onClick={clearFilters} className="btn btn-link p-0 small text-decoration-none transition-all hover-opacity-75" style={{ color: '#c9943a' }}>ล้างค่า</button>
            </div>
            
            <div className="mb-4">
                <label className="fw-bold small mb-2 text-uppercase" style={{ color: '#8a7b72', letterSpacing: '1px' }}>โซน (Zone)</label>
                <div className="d-flex flex-column gap-2">
                    {/* ปุ่ม "ทั้งหมด" */}
                    <button
                        onClick={() => setSelectedZone(null)}
                        className={`btn text-start d-flex justify-content-between align-items-center py-3 px-4 rounded-4 transition-all`}
                        style={{
                            backgroundColor: selectedZone === null ? '#A73B24' : '#2d2320',
                            color: selectedZone === null ? '#f5ebe4' : '#9a8a7e',
                            border: `1px solid ${selectedZone === null ? '#A73B24' : '#3d302a'}`,
                            fontWeight: selectedZone === null ? 'bold' : 'normal'
                        }}>
                        <div className="d-flex align-items-center gap-3">
                            <MapPin size={18} />
                            <span>ทั้งหมด</span>
                        </div>
                    </button>

                    {/* ปุ่มโซน */}
                    {zonesWithCount && zonesWithCount.map(z => {
                        const isSelected = selectedZone === z.id;
                        return (
                            <button
                                key={z.id}
                                onClick={() => setSelectedZone(isSelected ? null : z.id)}
                                className={`btn text-start d-flex justify-content-between align-items-center py-3 px-4 rounded-4 transition-all`}
                                style={{
                                    backgroundColor: isSelected ? '#A73B24' : '#2d2320',
                                    color: isSelected ? '#f5ebe4' : '#9a8a7e',
                                    border: `1px solid ${isSelected ? '#A73B24' : '#3d302a'}`,
                                    fontWeight: isSelected ? 'bold' : 'normal'
                                }}>
                                <div className="d-flex align-items-center gap-3">
                                    <MapPin size={18} />
                                    <span>{z.label}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mb-2">
                <label className="fw-bold small mb-2 text-uppercase" style={{ color: '#8a7b72', letterSpacing: '1px' }}>หมวดหมู่ (Category)</label>
                <div className="d-flex flex-wrap gap-2">
                    {(categoriesWithCount.length > 0 ? categoriesWithCount : CATEGORIES).map(c => {
                        const isSelected = selectedCategory === c.id;
                        return (
                            <button key={c.id} onClick={() => setSelectedCategory(isSelected ? null : c.id)}
                                className={`btn btn-sm py-2 px-3 rounded-3 transition-all ${!isSelected ? 'filter-cat-btn' : ''}`}
                                style={{ 
                                    backgroundColor: isSelected ? '#A73B24' : '#2d2320',
                                    color: isSelected ? '#f5ebe4' : '#9a8a7e',
                                    border: `1px solid ${isSelected ? '#A73B24' : '#3d302a'}`,
                                    fontWeight: isSelected ? 'bold' : 'normal'
                                }}>
                                {c.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};