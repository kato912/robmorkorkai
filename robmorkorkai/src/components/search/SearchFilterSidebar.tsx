import React from "react";
import { ZONES, CATEGORIES, FACILITIES } from "../../data/mockDatat";

interface Props {
    selectedZone: string;
    setSelectedZone: (val: string) => void;
    selectedCategory: string;
    setSelectedCategory: (val: string) => void;
    selectedFacilities: string[];
    toggleFacility: (id: string) => void;
    clearFilters: () => void;
}

export const SearchFilterSidebar: React.FC<Props> = ({
    selectedZone, setSelectedZone,
    selectedCategory, setSelectedCategory,
    selectedFacilities, toggleFacility,
    clearFilters
}) => {
    return (
        <div className="bg-white p-4 rounded-4 shadow-sm sticky-top" style={{ top: '100px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold m-0">ตัวกรอง</h5>
                <button onClick={clearFilters} className="btn btn-link text-secondary p-0 small text-decoration-none">ล้างค่า</button>
            </div>
            
            {/* Zones */}
            <div className="mb-4">
                <label className="fw-bold small text-secondary mb-2">โซน</label>
                <div className="d-flex flex-column gap-1">
                    {ZONES.map(z => (
                        <button key={z.id} onClick={() => setSelectedZone(z.id)}
                            className={`btn text-start border-0 py-2 rounded-3 ${selectedZone === z.id ? 'bg-primary text-white' : 'hover-bg-light text-secondary'}`}>
                            {z.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Categories */}
            <div className="mb-4">
                <label className="fw-bold small text-secondary mb-2">หมวดหมู่</label>
                <div className="d-flex flex-wrap gap-2">
                    {CATEGORIES.map(c => (
                        <button key={c.id} onClick={() => setSelectedCategory(c.id)}
                            className={`btn btn-sm border py-2 px-3 rounded-3 ${selectedCategory === c.id ? 'bg-primary text-white border-primary' : 'bg-white text-secondary'}`}>
                            {c.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Facilities */}
            <div>
                <label className="fw-bold small text-secondary mb-2">สิ่งอำนวยความสะดวก</label>
                <div className="d-flex flex-column gap-2">
                    {FACILITIES.map(f => (
                        <div key={f.id} className="form-check cursor-pointer" onClick={() => toggleFacility(f.id)}>
                            <input className="form-check-input" type="checkbox" checked={selectedFacilities.includes(f.id)} readOnly />
                            <label className="form-check-label small cursor-pointer">{f.label}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};