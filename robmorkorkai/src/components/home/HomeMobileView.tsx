import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import type { HomeViewProps } from '../pages/HomePage';

// Context
import { useAuth } from "../../context/AuthContext";

// Custom Hooks
import { useTypingEffect } from "../../hooks/useTypingEffect";

// Components
import { AIBanner } from "./AIBanner";
import { ShopCard } from "./ShopCard";
import { ZoneFilter } from "./ZoneFilter";
import { CategoryFilter } from "./CategoryFilter";
import { BottomNav } from "../layout/BottomNav";
import { RandomShopButton } from "./RandomShopButton";

// Assets
import HeroImage from "../../assets/hero-campus-life.jpg";
import "./css/HomeMobileView.css";

const TYPING_PHRASES = [
    "หาชาบูเด็ดๆ หลังมอ...", 
    "คาเฟ่อ่านหนังสือกังสดาล...", 
    "ร้านนั่งชิลฟีลดีๆ...", 
    "ไม่รู้จะกินอะไรดี?..."
];

/**
 * Mobile view สำหรับ HomePage
 * - ค้นหาร้านด้วย typing animation
 * - Filter โดย Zone และ Category
 * - แสดงรายชื่อร้านในรูป ShopCard
 * - Navigation ผ่าน BottomNav
 */
const HomeMobileView: React.FC<HomeViewProps> = ({
    selectedZone, setSelectedZone,
    selectedCategory, setSelectedCategory,
    filteredShops, zone, categorie
}) => {
    const navigate = useNavigate();
    const { isLoggedIn, user } = useAuth(); 
    const [searchText, setSearchText] = useState("");

    const placeholderText = useTypingEffect(TYPING_PHRASES);
    const profileImage = user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100";

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchText.trim() !== "") {
            navigate('/search', { state: { startQuery: searchText } });
        }
    };

    return (
        <>
            <div className="min-vh-100 animate-fade-up" style={{ paddingBottom: '90px', backgroundColor: '#1a1412' }}> 
                
                {/* Header with logo and profile */}
                <div className="px-4 pb-4 pt-5" style={{ background: '#231c18', borderBottom: '1px solid rgba(201, 148, 58, 0.2)' }}>
                    {/* Logo and user profile section */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center gap-3">
                            <div className="rounded-3 p-2" style={{ background: '#A73B24' }}>
                                <MapPin size={18} style={{ color: '#f5ebe4' }}  />
                            </div>
                            <div>
                                <h6 className="fw-bold m-0" style={{ letterSpacing: '-0.5px', color: '#f5ebe4' }}>robmorkorkai</h6>
                                <small className="d-block" style={{ fontSize: '0.65rem', color: '#e8b94a' }}>Khon Kaen University</small>
                            </div>
                        </div>

                        {isLoggedIn ? (
                            <Link to="/profile">
                                <img src={profileImage} alt="Profile" className="rounded-circle object-fit-cover custom-mobile-profile" style={{ width: '36px', height: '36px' }} />
                            </Link>
                        ) : (
                            <Link to="/login" className="btn btn-sm rounded-pill px-4 fw-medium custom-mobile-login" style={{ backgroundColor: '#A73B24', color: '#f5ebe4' }}>เข้าสู่ระบบ</Link>
                        )}
                    </div>

                    {/* Search Bar */}
                    <div className="position-relative">
                        <Search className="position-absolute top-50 translate-middle-y ms-3" size={18} style={{ color:'#c9943a'}}/>
                        <input
                            className="form-control custom-mobile-search rounded-pill ps-5 border-0 shadow-none"
                            placeholder={placeholderText || "ค้นหาร้าน..."} 
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleSearch}
                            style={{ height: '48px', fontSize: '0.95rem', backgroundColor: '#3d302a', color: '#f5ebe4' }}
                        />
                    </div>
                </div>

                {/* Hero section with promotional image and text overlay */}
                <div className="px-3 mt-3">
                    <div className="position-relative rounded-4 overflow-hidden mb-4 shadow-sm" style={{ height: '180px' }}>
                        {/* Image Background */}
                        <img src={HeroImage} alt="KKU Campus" className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover" />
                        
                        {/* Dark Gradient Overlay */}
                        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(26,18,16,0.95) 0%, rgba(26,18,16,0.2) 60%, transparent 100%)' }}></div>
                        
                        {/* Red Tint */}
                        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(167, 59, 36, 0.4) 0%, transparent 60%)' }}></div>
                        
                        {/* Text Content */}
                        <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ zIndex: 10 }}>
                            <div className="d-flex align-items-center gap-2 mb-1">
                                <div style={{ width: '20px', height: '1.5px', backgroundColor: '#c9943a' }}></div>
                                <small className="fw-bold text-uppercase m-0" style={{ color: '#c9943a', fontSize: '0.65rem', letterSpacing: '1px' }}>KKU Campus Guide</small>
                            </div>
                            <h5 className="fw-bolder text-white mb-1" style={{ letterSpacing: '-0.5px' }}>
                                ค้นหาร้านดีๆ รอบรั้ว มข.
                            </h5>
                            <p className="m-0" style={{ fontSize: '0.75rem', color: '#e8ebe4' }}>
                                รวมร้านอาหาร คาเฟ่ ที่อ่านหนังสือยอดนิยม
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main content: filters and shop list */}
                <div className="px-3">
                    {/* AI Banner */}
                    <div className="mb-4">
                        <AIBanner />
                    </div>

                    {/* Zone Filter */}
                    <div className="mb-4">
                        <h6 className="text-uppercase fw-bold mb-3" style={{ fontSize: '0.75rem', letterSpacing: '1px', color: '#c9943a' }}>โซน</h6>
                        <ZoneFilter zones={zone} selectedZone={selectedZone} setSelectedZone={setSelectedZone} isMobile />
                    </div>

                    {/* Category Filter */}
                    <div className="mb-4">
                        <h6 className="text-uppercase fw-bold mb-3" style={{ fontSize: '0.75rem', letterSpacing: '1px', color: '#c9943a' }}>หมวดหมู่</h6>
                        <CategoryFilter categories={categorie} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    </div>

                    {/* Display shop list */}
                    <div className="mb-2">
                        <div className="d-flex align-items-end justify-content-between mb-3">
                            <div>
                                <h5 className="fw-bold m-0" style={{ color: '#f5ebe4' }}>{searchText ? `ผลการค้นหา` : "ร้านยอดนิยม"}</h5>
                                <p className="small m-0 mt-1" style={{ color: '#9a8a7e' }}>{filteredShops.length} ร้านที่แนะนำ</p>
                            </div>
                        </div>
                        <div className="d-flex flex-column gap-3 pb-4">
                            {filteredShops.map((shop) => (
                                <ShopCard key={shop.id} shop={shop} />
                            ))}
                            {filteredShops.length === 0 && (
                                <div className="text-center py-5 rounded-4 border shadow-sm" style={{ background: '#231c18', borderColor: '#3d302a' }}>
                                    <Search size={32} className="opacity-25 mb-2" style={{ color: '#f5ebe4' }} />
                                    <p className="small m-0" style={{ color: '#9a8a7e' }}>ไม่พบร้านที่คุณค้นหา</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <BottomNav activePage="home" />
            <RandomShopButton shops={filteredShops} />
        </>
    );
};

export default HomeMobileView;