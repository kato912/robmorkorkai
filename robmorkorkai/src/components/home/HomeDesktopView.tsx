import React from "react";
import { ShopCard } from "./ShopCard";
import { ZoneFilter } from "./ZoneFilter";
import { CategoryFilter } from "./CategoryFilter";
import { AIBanner } from "./AIBanner";
import { TopNavbar } from "../layout/TopNavbar";
import type { HomeViewProps } from "../pages/HomePage"

const HomeDesktopView: React.FC<HomeViewProps> = ({
    isLoggedIn,
    selectedZone, 
    setSelectedZone,
    selectedCategory, 
    setSelectedCategory,
    filteredShops, 
    zones, 
    categories
}) => {
    return (
        <div className="bg-light min-vh-100">

            {/* Navbar */}
            <TopNavbar activePage="home" isLoggedIn={isLoggedIn} showSearchBar={true} />

            <div className="container py-5">
                <div className="row g-4">

                    {/* 👈 Sidebar Left: Zones Only */}
                    <div className="col-lg-3">
                        <div className="card border-0 shadow-sm p-4 sticky-top rounded-4" style={{ top: '100px', zIndex: 10 }}>
                            <h6 className="fw-bold text-secondary mb-3">📍 เลือกโซน (Zone)</h6>
                            <ZoneFilter 
                                zones={zones} 
                                selectedZone={selectedZone} 
                                setSelectedZone={setSelectedZone} 
                            />
                        </div>
                    </div>

                    {/* 👉 Right Content: Main Area */}
                    <div className="col-lg-9">

                        <div className="mb-4">
                            <AIBanner />
                        </div>

                        {/* ✅ Category Filter */}
                        <div className="mb-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="fw-bold text-dark m-0">🍽️ หมวดหมู่</h5>
                            </div>
                            <CategoryFilter 
                                categories={categories} 
                                selectedCategory={selectedCategory} 
                                setSelectedCategory={setSelectedCategory} 
                            />
                        </div>

                        {/* ✅ Shop Grid */}
                        <h4 className="fw-bold text-dark mb-4 mt-5 border-bottom pb-3">🔥 ร้านยอดฮิต</h4>

                        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                            {filteredShops.map((shop) => (
                                <div className="col" key={shop.id}>
                                    <ShopCard shop={shop} />
                                </div>
                            ))}

                            {filteredShops.length === 0 && (
                                <div className="col-12 text-center py-5 text-muted bg-white rounded-4 shadow-sm border border-dashed">
                                    <p className="mb-0 fs-5">ไม่พบร้านในหมวดหมู่นี้</p>
                                    <button 
                                        className="btn btn-link text-primary mt-2"
                                        onClick={() => {
                                            setSelectedZone(null);
                                            setSelectedCategory(null);
                                        }}
                                    >
                                        ล้างการค้นหาทั้งหมด
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HomeDesktopView;