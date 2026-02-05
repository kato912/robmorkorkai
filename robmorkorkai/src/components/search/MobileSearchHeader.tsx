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
        <div className="d-lg-none bg-white sticky-top shadow-sm transition" style={{ zIndex: 1020 }}>
            {/* Top Bar (เหมือนเดิม) */}
            <div className="pt-3 px-3 pb-2">
                <div className="d-flex align-items-center gap-3">
                    <Link to="/" className="text-secondary"><Home size={24} strokeWidth={2} /></Link>
                    <div className="position-relative flex-grow-1">
                        <Search className="position-absolute text-muted" style={{ top: '10px', left: '12px' }} size={18} />
                        <input className="form-control rounded-4 border-0 bg-light ps-5" placeholder="ค้นหา..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <button className={`btn border-0 rounded-3 p-2 transition ${showFilters ? 'bg-primary text-white shadow-sm' : 'bg-light text-secondary'}`} onClick={() => setShowFilters(!showFilters)}>
                        {showFilters ? <X size={20} /> : <SlidersHorizontal size={20} />}
                    </button>
                </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="px-3 pb-3 border-top pt-3 animate-fade-in bg-white">
                    {/* Zone Filter (เหมือนเดิม) */}
                    <div className="mb-3">
                        <small className="text-secondary fw-bold mb-2 d-block" style={{ fontSize: '0.8rem' }}>โซน</small>
                        <div className="d-flex flex-wrap gap-2">
                            {ZONES.map(z => (
                                <button key={z.id} onClick={() => setSelectedZone(z.id)} className={`btn btn-sm rounded-pill px-3 ${selectedZone === z.id ? 'btn-primary' : 'btn-light border-0 text-secondary'}`}>{z.label}</button>
                            ))}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-3">
                        <small className="text-secondary fw-bold mb-2 d-block" style={{ fontSize: '0.8rem' }}>หมวดหมู่</small>
                        <div className="d-flex flex-wrap gap-2">
                            {CATEGORIES.map(c => {
                                const Icon = c.icon || Coffee;
                                return <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`btn btn-sm rounded-pill px-3 d-flex gap-1 align-items-center ${selectedCategory === c.id ? 'btn-primary' : 'btn-light border-0 text-secondary'}`}><Icon size={14} /> {c.label}</button>
                            })}
                        </div>
                    </div>

                    {/* Facility Filter */}
                    <div className="mb-3">
                        <small className="text-secondary fw-bold mb-2 d-block" style={{ fontSize: '0.8rem' }}>สิ่งอำนวยความสะดวก</small>
                        <div className="d-flex flex-wrap gap-2">
                            {FACILITIES.map(f => {
                                const Icon = f.icon;
                                const isSelected = selectedFacilities.includes(f.id);
                                return (
                                    <button 
                                        key={f.id} 
                                        onClick={() => toggleFacility(f.id)} 
                                        className={`btn btn-sm rounded-pill px-3 d-flex gap-1 align-items-center ${isSelected ? 'btn-primary' : 'btn-light border-0 text-secondary'}`}
                                    >
                                        <Icon size={14} /> {f.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Clear Button */}
                    {(selectedZone !== 'all' || selectedCategory !== 'all' || selectedFacilities.length > 0) && (
                        <div className="text-end mt-2 pt-2 border-top">
                            <button onClick={clearFilters} className="btn btn-link text-danger p-0 small text-decoration-none">ล้างตัวกรองทั้งหมด</button>
                        </div>
                    )}
                </div>
            )}

            {/* Quick Filter Slide */}
            <div className="overflow-hidden transition-all bg-white border-top" style={{ maxHeight: (isScrolled && !showFilters) ? '60px' : '0px', opacity: (isScrolled && !showFilters) ? 1 : 0 }}>
                <div className="d-flex align-items-center gap-2 px-3 py-2 overflow-auto no-scrollbar">
                    <span className="text-muted small text-nowrap me-1"><MapPin size={12} /> โซน:</span>
                    {ZONES.map(z => (<button key={z.id} onClick={() => setSelectedZone(z.id)} className={`btn btn-sm rounded-pill text-nowrap px-3 ${selectedZone === z.id ? 'btn-primary' : 'btn-light border-0 text-secondary'}`}>{z.label}</button>))}
                </div>
            </div>
        </div>
    );
};