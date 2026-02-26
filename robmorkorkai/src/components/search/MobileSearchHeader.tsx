import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Home, X, SlidersHorizontal, MapPin, Coffee } from "lucide-react";
import { ZONES, CATEGORIES, FACILITIES } from "../../data/mockDatat";

interface Props {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    selectedZone: string;
    setSelectedZone: (val: string) => void;
    selectedCategory: string;
    setSelectedCategory: (val: string) => void;
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

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="d-lg-none sticky-top shadow-sm transition" style={{ zIndex: 1020, backgroundColor: '#1a1412', borderBottom: '1px solid #3d302a' }}>
            <div className="pt-3 px-3 pb-2">
                <div className="d-flex align-items-center gap-3">
                    <Link to="/" style={{ color: '#9a8a7e' }}><Home size={24} strokeWidth={2} /></Link>
                    <div className="position-relative flex-grow-1">
                        <Search className="position-absolute" style={{ top: '10px', left: '12px', color: '#8a7b72' }} size={18} />
                        <input 
                            className="form-control rounded-4 border-0 ps-5 shadow-none" 
                            placeholder="ค้นหา..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            style={{ backgroundColor: '#231c18', color: '#f5ebe4' }}
                        />
                    </div>
                    <button 
                        className="btn border-0 rounded-3 p-2 transition shadow-sm" 
                        onClick={() => setShowFilters(!showFilters)}
                        style={{ 
                            backgroundColor: showFilters ? '#A73B24' : '#231c18',
                            color: showFilters ? '#fff5f0' : '#9a8a7e'
                        }}
                    >
                        {showFilters ? <X size={20} /> : <SlidersHorizontal size={20} />}
                    </button>
                </div>
            </div>

            {showFilters && (
                <div className="px-3 pb-3 pt-3 animate-fade-in" style={{ backgroundColor: '#1a1412', borderTop: '1px solid #3d302a' }}>
                    <div className="mb-3">
                        <small className="fw-bold mb-2 d-block" style={{ fontSize: '0.8rem', color: '#c9943a' }}>โซน</small>
                        <div className="d-flex flex-wrap gap-2">
                            {ZONES.map(z => (
                                <button key={z.id} onClick={() => setSelectedZone(z.id)} 
                                    className="btn btn-sm rounded-pill px-3"
                                    style={{ 
                                        backgroundColor: selectedZone === z.id ? '#A73B24' : '#2d2320',
                                        color: selectedZone === z.id ? '#f5ebe4' : '#9a8a7e',
                                        border: 'none'
                                    }}>
                                    {z.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-3">
                        <small className="fw-bold mb-2 d-block" style={{ fontSize: '0.8rem', color: '#c9943a' }}>หมวดหมู่</small>
                        <div className="d-flex flex-wrap gap-2">
                            {CATEGORIES.map(c => {
                                const Icon = c.icon || Coffee;
                                return (
                                    <button key={c.id} onClick={() => setSelectedCategory(c.id)} 
                                        className="btn btn-sm rounded-pill px-3 d-flex gap-1 align-items-center"
                                        style={{ 
                                            backgroundColor: selectedCategory === c.id ? '#A73B24' : '#2d2320',
                                            color: selectedCategory === c.id ? '#f5ebe4' : '#9a8a7e',
                                            border: 'none'
                                        }}>
                                        <Icon size={14} /> {c.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mb-3">
                        <small className="fw-bold mb-2 d-block" style={{ fontSize: '0.8rem', color: '#c9943a' }}>สิ่งอำนวยความสะดวก</small>
                        <div className="d-flex flex-wrap gap-2">
                            {FACILITIES.map(f => {
                                const Icon = f.icon;
                                const isSelected = selectedFacilities.includes(f.id);
                                return (
                                    <button key={f.id} onClick={() => toggleFacility(f.id)} 
                                        className="btn btn-sm rounded-pill px-3 d-flex gap-1 align-items-center"
                                        style={{ 
                                            backgroundColor: isSelected ? '#A73B24' : '#2d2320',
                                            color: isSelected ? '#f5ebe4' : '#9a8a7e',
                                            border: 'none'
                                        }}>
                                        <Icon size={14} /> {f.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {(selectedZone !== 'all' || selectedCategory !== 'all' || selectedFacilities.length > 0) && (
                        <div className="text-end mt-2 pt-2" style={{ borderTop: '1px solid #3d302a' }}>
                            <button onClick={clearFilters} className="btn btn-link p-0 small text-decoration-none" style={{ color: '#c9943a' }}>ล้างตัวกรองทั้งหมด</button>
                        </div>
                    )}
                </div>
            )}

            <div className="overflow-hidden transition-all" style={{ backgroundColor: '#1a1412', borderTop: '1px solid #3d302a', maxHeight: (isScrolled && !showFilters) ? '60px' : '0px', opacity: (isScrolled && !showFilters) ? 1 : 0 }}>
                <div className="d-flex align-items-center gap-2 px-3 py-2 overflow-auto no-scrollbar">
                    <span className="small text-nowrap me-1" style={{ color: '#8a7b72' }}><MapPin size={12} /> โซน:</span>
                    {ZONES.map(z => (
                        <button key={z.id} onClick={() => setSelectedZone(z.id)} 
                            className="btn btn-sm rounded-pill text-nowrap px-3"
                            style={{ 
                                backgroundColor: selectedZone === z.id ? '#A73B24' : '#2d2320',
                                color: selectedZone === z.id ? '#f5ebe4' : '#9a8a7e',
                                border: 'none'
                            }}>
                            {z.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};