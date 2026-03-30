import React from "react";

export interface CategoryItem {
    id: string;
    label: string;
    icon?: any; 
}

interface Props {
    categories: CategoryItem[];
    selectedCategory: string | null;
    setSelectedCategory: (id: string | null) => void;
}

export const CategoryFilter: React.FC<Props> = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div className="d-flex gap-2 overflow-auto pb-3 px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

            {/* ปุ่ม "ทั้งหมด" */}
            <button
                onClick={() => setSelectedCategory(null)}
                className="btn rounded-pill px-3 d-flex align-items-center justify-content-center text-nowrap transition-all shadow-sm"
                style={{
                    fontSize: '0.85rem', // ลดขนาดฟอนต์ลงนิดนึง
                    height: '36px',      // ล็อคความสูงให้ปุ่มดูเพรียวขึ้น
                    ...(selectedCategory === null
                        ? { backgroundColor: '#A73B24', opacity: 15, color: '#e8b94a', fontWeight: 'bold', border: `1px solid #c9943a` }
                        : { backgroundColor: '#2d2320', color: '#c9943a', border: '1px solid #3d302a' })
                }}
            >
                ทั้งหมด
            </button>

            {/* ปุ่มหมวดหมู่ต่างๆ */}
            {categories?.map((cat) => {
                const Icon = cat.icon; // ดึง Icon ออกมา
                return (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                        className="btn rounded-pill px-3 d-flex align-items-center justify-content-center gap-2 text-nowrap transition-all shadow-sm"
                        style={{
                            fontSize: '0.85rem',
                            height: '36px',
                            ...(selectedCategory === cat.id
                                ? { backgroundColor: '#A73B24', opacity: 15, color: '#e8b94a', fontWeight: 'bold', border: `1px solid #c9943a` }
                                : { backgroundColor: '#2d2320', color: '#c9943a', border: '1px solid #3d302a' })
                        }}
                    >
                        {/* ถ้ามี Icon ให้แสดง Icon ด้วย */}
                        {Icon && <Icon size={16} />}
                        <span>{cat.label}</span>
                    </button>
                );
            })}
        </div>
    );
};