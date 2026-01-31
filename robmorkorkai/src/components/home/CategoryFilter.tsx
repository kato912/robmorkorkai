import React from "react";

interface Props {
    categories: any[];
    selectedCategory: string | null;
    setSelectedCategory: (id: string | null) => void;
}

export const CategoryFilter: React.FC<Props> = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div className="d-flex gap-2 overflow-auto pb-2" style={{ scrollbarWidth: 'none' }}>

            {/* ปุ่มทั้งหมด */}
            <button
                onClick={() => setSelectedCategory(null)}
                className={`btn btn-sm rounded-pill px-3 text-nowrap transition-all ${selectedCategory === null
                        ? "btn-dark text-white fw-bold shadow-sm"
                        : "btn-white bg-white text-secondary border"
                    }`}
            >
                ทั้งหมด
            </button>

            {/* ปุ่มหมวดหมู่ */}
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                    className={`btn btn-sm rounded-pill px-3 text-nowrap transition-all ${selectedCategory === cat.id
                            ? "btn-dark text-white fw-bold shadow-sm"
                            : "btn-white bg-white text-secondary border"
                        }`}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    );
};