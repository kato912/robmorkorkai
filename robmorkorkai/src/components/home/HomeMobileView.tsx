import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ 1. เพิ่ม useNavigate
import { Search, MapPin, Menu, X } from "lucide-react";
import { AIBanner } from "./AIBanner";
import { ShopCard } from "./ShopCard";
import { ZoneFilter } from "./ZoneFilter";
import { CategoryFilter } from "./CategoryFilter";
import { BottomNav } from "../layout/BottomNav";
import type { HomeViewProps } from '../pages/HomePage'

const HomeMobileView: React.FC<HomeViewProps> = ({
    isLoggedIn,
    selectedZone, setSelectedZone,
    selectedCategory, setSelectedCategory,
    filteredShops, zones, categories
}) => {
    const navigate = useNavigate(); // ✅ 2. เรียกใช้ hook
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState(""); // State สำหรับรับค่า input
    const profileImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100";

    // ✅ 3. ฟังก์ชันกด Enter แล้วไปหน้า Search
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // ส่งค่าที่พิมพ์ไปด้วย (ถ้าหน้า Search รองรับการรับค่าผ่าน state หรือ url)
            navigate('/search', { state: { startQuery: searchText } });
        }
    };

    return (
        <>
            <style>{`* { -webkit-tap-highlight-color: transparent; }`}</style>

            <div className="bg-light min-vh-100" style={{ paddingBottom: '100px' }}>
                {/* Header */}
                <div className="bg-primary text-white p-4 pb-5 rounded-bottom-4 shadow-sm position-relative">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center gap-2">
                            <MapPin size={24} /> <span className="fw-bold fs-5">robmorkorkai</span>
                        </div>

                        {isLoggedIn ? (
                            <Link to="/profile" className="text-decoration-none">
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="rounded-circle border border-2 border-white"
                                    style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                                />
                            </Link>
                        ) : (
                            <button onClick={() => setMobileMenuOpen(true)} className="btn text-white p-0">
                                <Menu size={28} />
                            </button>
                        )}
                    </div>

                    <div className="position-relative">
                        <Search className="position-absolute top-50 translate-middle-y ms-3 text-secondary" size={20} />
                        {/* ✅ 4. Input ผูกกับ handleSearch */}
                        <input
                            className="form-control rounded-pill ps-5 border-0 shadow-sm"
                            placeholder="ค้นหาร้านอาหาร..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleSearch} // กด Enter แล้วไป
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="px-3 mt-4">
                    <div className="mb-4">
                        <AIBanner />
                    </div>

                    <div className="mb-3">
                        <h6 className="fw-bold text-secondary mb-2 small">📍 โซน (Zone)</h6>
                        <ZoneFilter zones={zones} selectedZone={selectedZone} setSelectedZone={setSelectedZone} isMobile />
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold text-secondary mb-2 small">🍽️ หมวดหมู่ (Category)</h6>
                        <CategoryFilter categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    </div>

                    <div className="mb-5">
                        <h6 className="fw-bold text-secondary mb-3">🔥 ร้านยอดฮิต</h6>
                        <div className="d-flex flex-column gap-3">
                            {/* แสดงรายการตามปกติ (เหมือนเดิม) ไม่ต้องกรอง Local */}
                            {filteredShops.map((shop) => (
                                <ShopCard key={shop.id} shop={shop} />
                            ))}
                            {filteredShops.length === 0 && (
                                <div className="text-center py-5 text-muted small bg-white rounded-3">ไม่พบร้านที่คุณค้นหา</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <BottomNav activePage="home" isLoggedIn={isLoggedIn} />

            {/* Menu Overlay */}
            {mobileMenuOpen && (
                <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 z-3" onClick={() => setMobileMenuOpen(false)}>
                    <div className="position-absolute top-0 end-0 bg-white h-100 p-4 shadow" style={{ width: '280px' }} onClick={e => e.stopPropagation()}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0 fw-bold">เมนู</h5>
                            <button className="btn p-0" onClick={() => setMobileMenuOpen(false)}><X /></button>
                        </div>
                        <div className="d-grid gap-2">
                            <Link to="/login" className="btn btn-primary rounded-pill">เข้าสู่ระบบ</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HomeMobileView;